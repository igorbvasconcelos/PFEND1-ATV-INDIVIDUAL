
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const [reservas, setReservas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/reservas")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setReservas(dados.dados);
      })
      .catch((erro) => {
        console.log("Erro ao buscar reservas:", erro);
      });
  }, []);

  function adicionarReserva() {
    router.push("/reservas/nova");
  }

  function editarReserva(id) {
    router.push("/reservas/" + id + "/editar");
  }

  async function removerReserva(id) {
    const confirmar = window.confirm(
      "Deseja realmente remover esta reserva?"
    );

    if (confirmar === false) {
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3001/reservas/" + id,
        {
          method: "DELETE"
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao remover reserva");
      }

      setReservas(
        reservas.filter((reserva) => reserva.id !== id)
      );

      alert("Reserva removida com sucesso!");

    } catch (erro) {
      console.log(erro);
      alert("Erro ao remover reserva.");
    }
  }

  return (
    <main className="container mt-5">

      <h1>Reservas do Restaurante</h1>

      <p>Gerencie as reservas do restaurante.</p>

      <button
        className="btn btn-warning mb-4"
        onClick={adicionarReserva}
      >
        Nova reserva
      </button>

      <div className="row mb-4">

        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Total de reservas</h5>
              <h2>{reservas.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Confirmadas</h5>
              <h2>
                {reservas.filter(
                  (reserva) => reserva.status === "Confirmada"
                ).length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Pendentes</h5>
              <h2>
                {reservas.filter(
                  (reserva) => reserva.status === "Pendente"
                ).length}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <h2>Reservas cadastradas</h2>

      {reservas.length === 0 ? (

        <p>Nenhuma reserva encontrada.</p>

      ) : (

        <div className="row">

          {reservas.map((reserva) => (

            <div className="col-md-4 mb-3" key={reserva.id}>

              <div className="card">
                <div className="card-body">

                  <h5>Reserva #{reserva.id}</h5>

                  <h4>{reserva.cliente}</h4>

                  <p>
                    <strong>Data:</strong> {reserva.data}
                  </p>

                  <p>
                    <strong>Horário:</strong> {reserva.horario}
                  </p>

                  <p>
                    <strong>Pessoas:</strong> {reserva.pessoas}
                  </p>

                  <p>
                    <strong>Telefone:</strong> {reserva.telefone}
                  </p>

                  <p>
                    <strong>Status:</strong> {reserva.status}
                  </p>

                  {reserva.observacao && (
                    <p>
                      <strong>Observação:</strong> {reserva.observacao}
                    </p>
                  )}

                  <button
                    className="btn btn-primary me-2 mb-2"
                    onClick={() => editarReserva(reserva.id)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removerReserva(reserva.id)}
                  >
                    Remover
                  </button>

                </div>
              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}
