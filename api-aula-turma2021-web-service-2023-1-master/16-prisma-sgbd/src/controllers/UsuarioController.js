import bcrypt from "bcryptjs";
import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuarioController {
  // GET - listar Usuarios por nome com paginação 
  static listarUsuarios = async (req, res) => {
    try {
      let userExists = null;

      // fazer uma busca no banco de dados por todos os registros de usuarios sem filtro
      if (!req.query.nome && !req.query.email) {
        userExists = await prisma.usuarios.findMany();
      }

      // fazer uma busca no banco de dados com filtro por nome
      if (!req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      // fazer uma busca no banco de dados com filtro por email
      if (req.query.email && !req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }
      // fazer uma busca no banco de dados com filtro por email e nome
      if (req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      return res.status(200).json(userExists);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // GET por ID - listar Usuario por ID 
  static listarUsuarioPorId = async (req, res) => {
    try {
      const userExists = await prisma.usuarios.findFirst({
        where: {
          id: {
            equals: req.params.id,
          }
        },
      });
      if (userExists) {
        return res.status(200).json(userExists);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // POST - cadastrar Usuario
  static cadastrarUsuario = async (req, res) => {
    try {

      const { nome, email, senha, ativo } = req.body;

      const erros = [];

      // validar os dados
      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome é obrigatório" })
      }
      if (!email) {
        erros.push({ error: true, code: 400, message: "Email é obrigatório" })
      }
      if (!senha) {
        erros.push({ error: true, code: 400, message: "Senha é obrigatório" })
      }
      if (!ativo) {
        erros.push({ error: true, code: 400, message: "Ativo é obrigatório" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
      }

      // verificar se o email já está cadastrado
      const userExists = await prisma.usuarios.findFirst({
        where: {
          email: {
            equals: email,
          }
        },
      });

      // se o email já estiver cadastrado, retornar erro
      if (userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Email já cadastrado" }])
      }

      // criptografar a senha
      const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));

      // criar o usuario
      const userCreated = await prisma.usuarios.create({
        data: {
          nome,
          email,
          senha: senhaCrypt,
          ativo,
        },
      });

      // retornar o usuario criado sem o campo senha
      delete userCreated.senha;
      return res.status(201).json(userCreated);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // PATCH - atualizar Usuario
  static PATCHAtualizarUsuario = async (req, res) => {
    try {
      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id
      const { nome, email, senha, ativo } = req.body;

      // validar os dados
      if (nome || email || senha || ativo && id) {
      } else {
        return res.status(400).json([{ error: true, code: 400, message: "Algum dado deve ser informado para atualizar o usuário" }])
      }

      // buscar email do usuario no banco de dados
      const emailExists = await prisma.usuarios.findFirst({
        where: {
          id: id
        },
      });

      console.log(email)
      console.log(typeof email)

      // verificar se o email informado é diferente do email do usuario no cadastro
      if (email !== undefined) {
        if (emailExists.email !== email) {
          // verificar se o email já está cadastrado para outro usuario
          const emailExistsOutherUser = await prisma.usuarios.findFirst({
            where: {
              email: {
                equals: email,
              },
              id: {
                not: {
                  equals: id,
                }
              }
            },
          });
          if (emailExistsOutherUser) {
            return res.status(400).json([{ error: true, code: 400, message: "Email já cadastrado" }])
          }
        }
      }

      // criptografar a senha
      if (senha) {
        const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));
      }

      // atualizar os atributos do usuario que foram informados
      const userUpdated = await prisma.usuarios.update({
        where: {
          id: id,
        },
        data: {
          nome,
          email,
          senha,
          ativo,
        },
      });

      // retornar o usuario criado sem o campo senha
      delete userUpdated.senha;
      return res.status(201).json(userUpdated);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // PATCH - atualizar Usuario
  static excluirUsuario = async (req, res) => {
    try {
      const erros = [];

      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id

      // buscar id do usuario no banco de dados
      const userExists = await prisma.usuarios.findFirst({
        where: {
          id: id,
        },
      });

      // verificar se o usuario existe
      if (!userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Usuário não encontrado" }])
      }

      // verificar se há informações nas tabelas de relacionamento: UsuariosRotas e UsuariosGrupos
      const userExistsRotas = await prisma.usuariosRotas.findMany({
        where: {
          usuario_id: id,
        },
      });

      const userExistsGrupos = await prisma.usuariosGrupos.findMany({
        where: {
          usuario_id: id,
        },
      });

      if (userExistsRotas) {
        erros.push({ error: true, code: 400, message: "Usuário possui rotas vinculadas, a exclusão só é permitida se o usuário não possuir rotas vinculadas" })
      }

      if (userExistsGrupos) {
        erros.push({ error: true, code: 400, message: "Usuário possui grupos vinculados, a exclusão só é permitida se o usuário não possuir grupos vinculados" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
      }

      // excluir o usuario
      const userDeleted = await prisma.usuarios.delete({
        where: {
          id: id,
        },
      });

      // retornar o usuario criado
      return res.status(200).json(userDeleted);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }
}

export default UsuarioController;