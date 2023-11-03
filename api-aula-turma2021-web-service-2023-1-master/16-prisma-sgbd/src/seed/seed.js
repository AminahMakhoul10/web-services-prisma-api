import { prisma } from "../configs/prismaClient.js";

// iniciando o prisma client
import bcrypt from 'bcryptjs';

// import { faker } from '@faker-js/faker';
import faker from 'faker-br'

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function senhaHash() {
    return bcrypt.hashSync('123', 8);
}

// função para gerar uuid compatível com o prisma
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-mixed-operators
        const r = Math.random() * 16 | 0;
        // eslint-disable-next-line no-mixed-operators,eqeqeq
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        // eslint-disable-next-line eqeqeq
        return v.toString(16);
    });
}

// sequencia de deleteMany
await prisma.usuarios.deleteMany({});
await prisma.grupos.deleteMany({});
await prisma.rotas.deleteMany({});
await prisma.gruposRotas.deleteMany({});
await prisma.usuariosGrupos.deleteMany({});
await prisma.usuariosRotas.deleteMany({});


// Função para inserir grupos no banco de dados
const grupos_array = ['Administrador', 'Usuário', 'Convidado'];

function getGruponome(i) {
    return grupos_array[i].toString();
}


// Inserir os usuários no banco de dados

const seed = async () => {
    const grupos = [];
    // Gerar 100 grupos aleatórios
    for (let i = 0; i < grupos_array.length; i++) {
        const id = uuidv4();
        const nome = getGruponome(i);
        const descricao = faker.lorem.sentence();
        const ativo = true;
        const unidade = faker.address.city() + '-' + faker.address.stateAbbr();

        grupos.push({
            id,
            nome,
            descricao,
            ativo,
            unidade
        });
    }

    // Inserir os grupos no banco de dados
    await prisma.grupos.createMany({
        data: grupos,
    });


    // rotas que serão inseridas no banco de dados
    const rotas = [];

    // função para retornar o nome de uma rota pela posição do array
    const rotas_array =
        [
            'rotas',
            'rotas:id',
            'grupos',
            'grupos:id',
            'unidades',
            'unidades:id',
            'usuarios',
            'usuarios:id'
        ]
    function getRotaName(i) {
        return rotas_array[i].toString();
    }

    // Gerar 100 grupos aleatórios
    for (let i = 0; i < rotas_array.length; i++) {
        const id = uuidv4();
        const rota = getRotaName(i);
        const dominio = 'localhost';
        const ativo = true;
        const verbo_get = true;
        const verbo_post = true;
        const verbo_put = true;
        const verbo_delete = true;
        const verbo_patch = true;

        rotas.push({
            id,
            rota,
            dominio,
            ativo,
            verbo_get,
            verbo_post,
            verbo_put,
            verbo_delete,
            verbo_patch
        });
    }

    // Inserir os grupos no banco de dados
    await prisma.rotas.createMany({
        data: rotas,
    });


    const usuarios = [];
    for (let i = 0; i < 50; i++) {
        const id = uuidv4();
        const nome = await faker.name.firstName() + ' ' + await faker.name.lastName() + ' ' + await faker.name.lastName()
        const email = nome.replace(/\s/g, '.').toLowerCase() + '@gmail.com';
        const senha = senhaHash();
        const ativo = true;

        usuarios.push({
            id,
            nome,
            email,
            senha,
            ativo
        })
    }

    await prisma.usuarios.createMany({
        data: usuarios,
    });


    // adicionar para grupo todas as rotas existentes
    const grupos_rotas_array = [];

    for (let i = 0; i < grupos.length; i++) {
        const grupo_id = grupos[i].id;
        for (let j = 0; j < rotas.length; j++) {
            const rota_id = rotas[j].id;
            const verbo_get = true;
            const verbo_post = true;
            const verbo_put = true;
            const verbo_delete = true;
            const verbo_patch = true;
            const ativo = true;

            grupos_rotas_array.push({
                grupo_id,
                rota_id,
                verbo_get,
                verbo_post,
                verbo_put,
                verbo_delete,
                verbo_patch,
                ativo,
            })
        }
    }

    await prisma.gruposRotas.createMany({
        data: grupos_rotas_array
    });

    // adicionar para grupo todas as rotas existentes
    const usuarios_rotas_array = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario_id = usuarios[i].id;      
        for (let j = 0; j < rotas.length; j++) {
            const rota_id = rotas[j].id;
            const verbo_get = true;
            const verbo_post = true;
            const verbo_put = true;
            const verbo_delete = true;
            const verbo_patch = true;
            const ativo = true;

            usuarios_rotas_array.push({
                usuario_id,
                rota_id,
                verbo_get,
                verbo_post,
                verbo_put,
                verbo_delete,
                verbo_patch,
                ativo,
            })
        }
    }
    await prisma.usuariosRotas.createMany({
        data: usuarios_rotas_array
    });


    // adicionar para grupo todas as rotas existentes
    const usuarios_grupos_array = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario_id = usuarios[i].id;      
        for (let j = 0; j < grupos.length; j++) {
            const grupo_id = grupos[j].id;
            usuarios_grupos_array.push({
                usuario_id,
                grupo_id,
            })
        }
    }

    await prisma.usuariosGrupos.createMany({
        data: usuarios_grupos_array
    });

    console.log('Dados criados com sucesso!');
}

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


