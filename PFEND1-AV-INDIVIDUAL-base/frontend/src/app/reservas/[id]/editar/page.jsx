
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

    fetch("http://localhost:3001/reservas/" + id)
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
        console.log(erro);
        alert("Não foi possível carregar a reserva.");
        router.push("/");
      });
  }, [id, router]);

  async function salvarAlteracoes(event) {
    event.preventDefault();

    const reservaAtualizada = {
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
        "http://localhost:3001/reservas/" + id,
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
      console.log(erro);
      alert("Não foi possível atualizar a reserva.");
    }
  }

  if (carregando) {
    return (
      <main className="container mt-5">
        <h2>Carregando reserva...</h2>
      </main>
    );
  }

  return (
    <main className="container mt-5">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => router.push("/")}
      >
        Voltar
      </button>

      <h1>Editar Reserva</h1>

      <p>Altere os dados da reserva.</p>

      <div className="card">
        <div className="card-body">

          <form onSubmit={salvarAlteracoes}>

            <div className="mb-3">
              <label className="form-label">
                Nome do cliente
              </label>

              <input
                type="text"
                className="form-control"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Telefone
              </label>

              <input
                type="tel"
                className="form-control"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Data
              </label>

              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Horário
              </label>

              <input
                type="time"
                className="form-control"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Quantidade de pessoas
              </label>

              <input
                type="number"
                min="1"
                className="form-control"
                value={pessoas}
                onChange={(e) => setPessoas(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Observação
              </label>

              <textarea
                className="form-control"
                rows="3"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pendente">Pendente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-warning me-2"
            >
              Salvar alterações
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push("/")}
            >
              Cancelar
            </button>

          </form>

        </div>
      </div>

    </main>
  );
}
