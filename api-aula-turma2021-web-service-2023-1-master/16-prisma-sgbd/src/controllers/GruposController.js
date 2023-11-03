import bcrypt from "bcryptjs";
import {prisma} from "../configs/prismaClient.js";



class GruposController {

    static listarGrupos = async (req, res) => {
        try {
            let gruposExist = null; 

             // realizar uma busca no banco de dados por todos os registros de usuarios sem filtro
            if(!req.query.nome) {
                gruposExist = await prisma.grupos.findMany({});
            }

            // fazer uma busca no banco de dados com filtro por nome
            if(!req.query.nome){
                gruposExist = await prisma.grupos.findMany({
                    where: {
                        nome: { 
                            contains: req.query.nome
                        },
                    },

                    
                });
            }
            return res.status(200).json(gruposExist);
        } catch (err) {
            console.log(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor"}])
        }
    } 
}   

export default UsuarioController;