"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarReserva() {

    const { id } = useParams();
    const router = useRouter();

    const [cliente, setCliente] = useState("");
    const [telefone, setTelefone] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [pessoas, setPessoas] = useState("");
    const [observacao, setObservacao] = useState("");
    const [status, setStatus] = useState("Pendente");

    const [carregando, setCarregando] = useState(true);


    useEffect(() => {

        if (!id) {
            return;
        }

        fetch(`http://localhost:3001/reservas/${id}`)
            .then((resposta) => {

                if (!resposta.ok) {
                    throw new Error("Reserva não encontrada");
                }

                return resposta.json();

            })
            .then((resultado) => {

                const reserva = resultado.dados;

                setCliente(reserva.cliente);
                setTelefone(reserva.telefone);
                setData(reserva.data);
                setHorario(reserva.horario);
                setPessoas(reserva.pessoas);
                setObservacao(reserva.observacao);
                setStatus(reserva.status);

                setCarregando(false);

            })
            .catch((erro) => {

                console.error(erro);

                alert("Não foi possível carregar a reserva.");

                router.push("/");

            });

    }, [id, router]);


    async function salvarAlteracoes(event) {

        event.preventDefault();

        const reservaAtualizada = {
            cliente,
            telefone,
            data,
            horario,
            pessoas: Number(pessoas),
            observacao,
            status
        };

        try {

            const resposta = await fetch(
                `http://localhost:3001/reservas/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(reservaAtualizada)
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro ao atualizar reserva");
            }

            alert("Reserva atualizada com sucesso!");

            router.push("/");

        } catch (erro) {

            console.error(erro);

            alert("Não foi possível atualizar a reserva.");

        }

    }


    if (carregando) {

        return (

            <main className="container py-5">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-warning mb-3"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Carregando...
                        </span>
                    </div>

                    <h4>
                        Carregando reserva...
                    </h4>

                    <p className="text-secondary">
                        Aguarde um momento.
                    </p>

                </div>

            </main>

        );

    }


    return (

        <main className="container py-5">

            {/* CABEÇALHO */}

            <div className="mb-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => router.push("/")}
                >
                    ← Voltar
                </button>

                <h1 className="fw-bold">
                    Editar Reserva
                </h1>

                <p className="text-secondary">
                    Altere as informações da reserva abaixo.
                </p>

            </div>


            {/* FORMULÁRIO */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4 p-md-5">

                    <form onSubmit={salvarAlteracoes}>

                        <div className="row g-4">


                            {/* CLIENTE */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="cliente"
                                    className="form-label fw-semibold"
                                >
                                    Nome do cliente
                                </label>

                                <input
                                    id="cliente"
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o nome do cliente"
                                    value={cliente}
                                    onChange={(event) =>
                                        setCliente(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* TELEFONE */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="telefone"
                                    className="form-label fw-semibold"
                                >
                                    Telefone
                                </label>

                                <input
                                    id="telefone"
                                    type="tel"
                                    className="form-control"
                                    placeholder="(11) 99999-9999"
                                    value={telefone}
                                    onChange={(event) =>
                                        setTelefone(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* DATA */}

                            <div className="col-md-4">

                                <label
                                    htmlFor="data"
                                    className="form-label fw-semibold"
                                >
                                    Data
                                </label>

                                <input
                                    id="data"
                                    type="date"
                                    className="form-control"
                                    value={data}
                                    onChange={(event) =>
                                        setData(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* HORÁRIO */}

                            <div className="col-md-4">

                                <label
                                    htmlFor="horario"
                                    className="form-label fw-semibold"
                                >
                                    Horário
                                </label>

                                <input
                                    id="horario"
                                    type="time"
                                    className="form-control"
                                    value={horario}
                                    onChange={(event) =>
                                        setHorario(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* PESSOAS */}

                            <div className="col-md-4">

                                <label
                                    htmlFor="pessoas"
                                    className="form-label fw-semibold"
                                >
                                    Quantidade de pessoas
                                </label>

                                <input
                                    id="pessoas"
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    placeholder="Ex: 4"
                                    value={pessoas}
                                    onChange={(event) =>
                                        setPessoas(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* OBSERVAÇÃO */}

                            <div className="col-md-8">

                                <label
                                    htmlFor="observacao"
                                    className="form-label fw-semibold"
                                >
                                    Observação
                                </label>

                                <textarea
                                    id="observacao"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Ex: Mesa próxima à janela..."
                                    value={observacao}
                                    onChange={(event) =>
                                        setObservacao(event.target.value)
                                    }
                                />

                            </div>


                            {/* STATUS */}

                            <div className="col-md-4">

                                <label
                                    htmlFor="status"
                                    className="form-label fw-semibold"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    className="form-select"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                >

                                    <option value="Pendente">
                                        Pendente
                                    </option>

                                    <option value="Confirmada">
                                        Confirmada
                                    </option>

                                    <option value="Cancelada">
                                        Cancelada
                                    </option>

                                </select>

                            </div>


                            {/* BOTÕES */}

                            <div className="col-12">

                                <hr className="my-2" />

                                <div className="d-flex justify-content-end gap-2">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => router.push("/")}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-warning fw-bold"
                                    >
                                        Salvar alterações
                                    </button>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </main>

    );

}