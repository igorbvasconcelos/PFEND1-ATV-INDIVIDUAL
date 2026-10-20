"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovaReserva() {

  const router = useRouter();

  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [observacao, setObservacao] = useState("");
  const [status, setStatus] = useState("Pendente");


  async function adicionarReserva(event) {

    event.preventDefault();

    const novaReserva = {
      cliente: cliente,
      telefone: telefone,
      data: data,
      horario: horario,
      pessoas: Number(pessoas),
      observacao: observacao,
      status: status
    };

    try {

      const resposta = await fetch(
        "http://localhost:3001/reservas",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(novaReserva)
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao criar reserva");
      }

      const resultado = await resposta.json();

      console.log(resultado);

      alert("Reserva criada com sucesso!");

      router.push("/");

    } catch (erro) {

      console.error(erro);

      alert("Erro ao criar a reserva.");

    }

  }


  return (

    <main className="container py-5">


      <div className="mb-4">

        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={() => router.push("/")}
        >
          ← Voltar
        </button>

        <h1 className="fw-bold">
          Nova Reserva
        </h1>

        <p className="text-secondary">
          Cadastre uma nova reserva para o restaurante.
        </p>

      </div>



      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          <form onSubmit={adicionarReserva}>

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
                  onChange={(e) => setCliente(e.target.value)}
                  required
                />

              </div>



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
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />

              </div>


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
                  onChange={(e) => setData(e.target.value)}
                  required
                />

              </div>



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
                  onChange={(e) => setHorario(e.target.value)}
                  required
                />

              </div>


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
                  onChange={(e) => setPessoas(e.target.value)}
                  required
                />

              </div>



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
                  onChange={(e) => setObservacao(e.target.value)}
                />

              </div>

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
                  onChange={(e) => setStatus(e.target.value)}
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
                    + Adicionar Reserva
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