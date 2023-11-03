-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(200) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rotas` (
    `id` VARCHAR(191) NOT NULL,
    `rota` VARCHAR(255) NOT NULL,
    `dominio` VARCHAR(255) NOT NULL,
    `verbo_get` BOOLEAN NOT NULL DEFAULT true,
    `verbo_post` BOOLEAN NOT NULL DEFAULT true,
    `verbo_put` BOOLEAN NOT NULL DEFAULT true,
    `verbo_delete` BOOLEAN NOT NULL DEFAULT true,
    `verbo_patch` BOOLEAN NOT NULL DEFAULT true,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rotas_dominio_rota_key`(`dominio`, `rota`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `unidade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `grupos_nome_unidade_key`(`nome`, `unidade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos_rotas` (
    `grupo_id` VARCHAR(191) NOT NULL,
    `rota_id` VARCHAR(191) NOT NULL,
    `verbo_get` BOOLEAN NOT NULL DEFAULT true,
    `verbo_post` BOOLEAN NOT NULL DEFAULT true,
    `verbo_put` BOOLEAN NOT NULL DEFAULT true,
    `verbo_delete` BOOLEAN NOT NULL DEFAULT true,
    `verbo_patch` BOOLEAN NOT NULL DEFAULT true,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `grupos_rotas_rota_id_fkey`(`rota_id`),
    UNIQUE INDEX `grupos_rotas_grupo_id_rota_id_key`(`grupo_id`, `rota_id`),
    PRIMARY KEY (`grupo_id`, `rota_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_rotas` (
    `usuario_id` VARCHAR(191) NOT NULL,
    `rota_id` VARCHAR(191) NOT NULL,
    `verbo_get` BOOLEAN NOT NULL DEFAULT true,
    `verbo_post` BOOLEAN NOT NULL DEFAULT true,
    `verbo_put` BOOLEAN NOT NULL DEFAULT true,
    `verbo_delete` BOOLEAN NOT NULL DEFAULT true,
    `verbo_patch` BOOLEAN NOT NULL DEFAULT true,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `usuarios_rotas_rota_id_fkey`(`rota_id`),
    UNIQUE INDEX `usuarios_rotas_usuario_id_rota_id_key`(`usuario_id`, `rota_id`),
    PRIMARY KEY (`usuario_id`, `rota_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_grupos` (
    `usuario_id` VARCHAR(191) NOT NULL,
    `grupo_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `FK_usuarios_grupos_grupos`(`grupo_id`),
    UNIQUE INDEX `usuario_id_grupo_id`(`usuario_id`, `grupo_id`),
    PRIMARY KEY (`usuario_id`, `grupo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grupos_rotas` ADD CONSTRAINT `grupos_rotas_grupo_id_fkey` FOREIGN KEY (`grupo_id`) REFERENCES `grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupos_rotas` ADD CONSTRAINT `grupos_rotas_rota_id_fkey` FOREIGN KEY (`rota_id`) REFERENCES `rotas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_rotas` ADD CONSTRAINT `usuarios_rotas_rota_id_fkey` FOREIGN KEY (`rota_id`) REFERENCES `rotas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_rotas` ADD CONSTRAINT `usuarios_rotas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_grupos` ADD CONSTRAINT `FK_usuarios_grupos_grupos` FOREIGN KEY (`grupo_id`) REFERENCES `grupos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_grupos` ADD CONSTRAINT `FK_usuarios_grupos_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
