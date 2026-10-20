import express from "express";

export const reservaRoutes = express.Router();

let reservas = [
    {
        id: 1,
        cliente: "João Silva",
        telefone: "(11) 99999-9999",
        data: "2026-09-30",
        horario: "19:30",
        pessoas: 4,
        observacao: "Mesa próxima à janela",
        status: "Confirmada"
    },
    {
        id: 2,
        cliente: "Mariana Oliveira",
        telefone: "(11) 98888-7777",
        data: "2026-10-01",
        horario: "20:00",
        pessoas: 2,
        observacao: "Comemoração de aniversário",
        status: "Pendente"
    },
    {
        id: 3,
        cliente: "Carlos Santos",
        telefone: "(11) 97777-6666",
        data: "2026-10-02",
        horario: "21:00",
        pessoas: 6,
        observacao: "Precisa de mesa grande",
        status: "Confirmada"
    }
];


function validarReserva(dados) {

    const erros = [];

    const {
        cliente,
        telefone,
        data,
        horario,
        pessoas,
        observacao,
        status
    } = dados;


    if (
        typeof cliente !== "string" ||
        cliente.trim() === ""
    ) {
        erros.push("Cliente é obrigatório");
    }

    if (
        typeof telefone !== "string" ||
        telefone.trim() === ""
    ) {

        erros.push("Telefone é obrigatório");

    } else {

        const telefoneValido =
            /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(
                telefone.trim()
            );

        if (!telefoneValido) {
            erros.push(
                "Telefone deve estar no formato (11) 99999-9999"
            );
        }

    }


    if (
        typeof data !== "string" ||
        data.trim() === ""
    ) {

        erros.push("Data é obrigatória");

    } else {

        const formatoData =
            /^\d{4}-\d{2}-\d{2}$/.test(data);

        if (!formatoData) {

            erros.push(
                "Data deve estar no formato AAAA-MM-DD"
            );

        } else {

            const [ano, mes, dia] =
                data.split("-").map(Number);

            const dataVerificada =
                new Date(ano, mes - 1, dia);

            if (
                dataVerificada.getFullYear() !== ano ||
                dataVerificada.getMonth() !== mes - 1 ||
                dataVerificada.getDate() !== dia
            ) {

                erros.push("Data inválida");

            }

        }

    }

    if (
        typeof horario !== "string" ||
        horario.trim() === ""
    ) {

        erros.push("Horário é obrigatório");

    } else {

        const horarioValido =
            /^([01]\d|2[0-3]):[0-5]\d$/.test(
                horario
            );

        if (!horarioValido) {

            erros.push(
                "Horário deve estar no formato HH:mm"
            );

        }

    }


    const quantidadePessoas = Number(pessoas);

    if (
        pessoas === undefined ||
        pessoas === null ||
        pessoas === "" ||
        !Number.isInteger(quantidadePessoas) ||
        quantidadePessoas <= 0
    ) {

        erros.push(
            "Quantidade de pessoas deve ser um número inteiro maior que zero"
        );

    }

    if (
        observacao !== undefined &&
        typeof observacao !== "string"
    ) {

        erros.push("Observação deve ser um texto");

    }

    const statusPermitidos = [
        "Pendente",
        "Confirmada",
        "Cancelada"
    ];

    if (
        typeof status !== "string" ||
        !statusPermitidos.includes(status)
    ) {

        erros.push(
            "Status deve ser Pendente, Confirmada ou Cancelada"
        );

    }


    return erros;

}

reservaRoutes.get("/", (req, res) => {

    res.status(200).json({
        sucesso: true,
        dados: reservas
    });

});

reservaRoutes.post("/", (req, res) => {

    const erros = validarReserva(req.body);


    if (erros.length > 0) {

        return res.status(400).json({
            sucesso: false,
            erros: erros
        });

    }


    const {
        cliente,
        telefone,
        data,
        horario,
        pessoas,
        observacao,
        status
    } = req.body;


    const novaReserva = {

        id: reservas.length > 0
            ? Math.max(
                ...reservas.map(
                    reserva => reserva.id
                )
            ) + 1
            : 1,

        cliente: cliente.trim(),

        telefone: telefone.trim(),

        data: data.trim(),

        horario: horario.trim(),

        pessoas: Number(pessoas),

        observacao:
            observacao
                ? observacao.trim()
                : "",

        status: status.trim()

    };


    reservas.push(novaReserva);


    res.status(201).json({

        sucesso: true,

        mensagem: "Reserva criada com sucesso",

        dados: novaReserva

    });

});

reservaRoutes.get("/:id", (req, res) => {

    const id = Number(req.params.id);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        return res.status(400).json({

            sucesso: false,

            erro: "ID deve ser um número inteiro positivo"

        });

    }


    const reserva = reservas.find(
        reserva => reserva.id === id
    );


    if (!reserva) {

        return res.status(404).json({

            sucesso: false,

            erro: "Reserva não encontrada"

        });

    }


    res.status(200).json({

        sucesso: true,

        dados: reserva

    });

});

reservaRoutes.put("/:id", (req, res) => {

    const id = Number(req.params.id);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        return res.status(400).json({

            sucesso: false,

            erro: "ID deve ser um número inteiro positivo"

        });

    }


    const indice = reservas.findIndex(
        reserva => reserva.id === id
    );


    if (indice === -1) {

        return res.status(404).json({

            sucesso: false,

            erro: "Reserva não encontrada"

        });

    }


    const erros = validarReserva(req.body);


    if (erros.length > 0) {

        return res.status(400).json({

            sucesso: false,

            erros: erros

        });

    }


    const {
        cliente,
        telefone,
        data,
        horario,
        pessoas,
        observacao,
        status
    } = req.body;


    reservas[indice] = {

        id,

        cliente: cliente.trim(),

        telefone: telefone.trim(),

        data: data.trim(),

        horario: horario.trim(),

        pessoas: Number(pessoas),

        observacao:
            observacao
                ? observacao.trim()
                : "",

        status: status.trim()

    };


    res.status(200).json({

        sucesso: true,

        mensagem: "Reserva atualizada com sucesso",

        dados: reservas[indice]

    });

});

reservaRoutes.delete("/:id", (req, res) => {

    const id = Number(req.params.id);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        return res.status(400).json({

            sucesso: false,

            erro: "ID deve ser um número inteiro positivo"

        });

    }


    const indice = reservas.findIndex(
        reserva => reserva.id === id
    );


    if (indice === -1) {

        return res.status(404).json({

            sucesso: false,

            erro: "Reserva não encontrada"

        });

    }


    const reservaRemovida =
        reservas.splice(indice, 1)[0];


    res.status(200).json({

        sucesso: true,

        mensagem: "Reserva excluída com sucesso",

        dados: reservaRemovida

    });

});