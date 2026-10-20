"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function App() {

  const [reservas, setReservas] = useState([]);

  const router = useRouter();

  useEffect(() => {

    fetch("http://localhost:3001/reservas")
      .then(response => response.json())
      .then(data => {
        setReservas(data.dados);
      })
      .catch(error => {
        console.error("Erro ao buscar reservas:", error);
      });

  }, []);


  function adicionarReserva() {
    router.push("/reservas/nova");
  }


  function editarReserva(id) {
    router.push(`/reservas/${id}/editar`);
  }


  async function removerReserva(id) {

    const confirmar = window.confirm(
      "Tem certeza que deseja remover esta reserva?"
    );

    if (!confirmar) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:3001/reservas/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao remover reserva");
      }

      setReservas(
        reservas.filter(reserva => reserva.id !== id)
      );

    } catch (error) {

      console.error(error);

      alert("Não foi possível remover a reserva.");

    }

  }


  return (

    <main className="container py-5">

      {/* CABEÇALHO */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>

          <p className="text-uppercase text-warning fw-bold mb-1">
            Restaurante
          </p>

          <h1 className="fw-bold mb-1">
            Reservas
          </h1>

          <p className="text-secondary mb-0">
            Gerencie as reservas do seu restaurante
          </p>

        </div>

        <button
          className="btn btn-warning fw-bold"
          onClick={adicionarReserva}
        >
          + Nova reserva
        </button>

      </div>


      <div className="row g-4 mb-5">

        <div className="col-md-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <div className="fs-2">
                🍽️
              </div>

              <div>

                <p className="text-secondary mb-0">
                  Total de reservas
                </p>

                <h3 className="fw-bold mb-0">
                  {reservas.length}
                </h3>

              </div>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <div className="fs-2">
                ✅
              </div>

              <div>

                <p className="text-secondary mb-0">
                  Confirmadas
                </p>

                <h3 className="fw-bold mb-0">

                  {
                    reservas.filter(
                      reserva => reserva.status === "Confirmada"
                    ).length
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <div className="fs-2">
                ⏳
              </div>

              <div>

                <p className="text-secondary mb-0">
                  Pendentes
                </p>

                <h3 className="fw-bold mb-0">

                  {
                    reservas.filter(
                      reserva => reserva.status === "Pendente"
                    ).length
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>



      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Reservas cadastradas
        </h2>

        <p className="text-secondary">
          Confira os detalhes das reservas
        </p>

      </div>




      {reservas.length === 0 ? (

        <div className="card border-0 shadow-sm text-center p-5">

          <div className="fs-1 mb-3">
            🍽️
          </div>

          <h4>
            Nenhuma reserva encontrada
          </h4>

          <p className="text-secondary">
            Cadastre a primeira reserva para começar.
          </p>

          <div>

            <button
              className="btn btn-warning fw-bold"
              onClick={adicionarReserva}
            >
              + Adicionar reserva
            </button>

          </div>

        </div>

      ) : (

        <div className="row g-4">

          {reservas.map(reserva => (

            <div
              className="col-lg-4 col-md-6"
              key={reserva.id}
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">


                  <div className="d-flex justify-content-between align-items-start mb-4">

                    <div>

                      <small className="text-secondary">
                        Reserva #{reserva.id}
                      </small>

                      <h4 className="fw-bold mb-0">
                        {reserva.cliente}
                      </h4>

                    </div>


                    <span
                      className={`badge ${
                        reserva.status === "Confirmada"
                          ? "text-bg-success"
                          : reserva.status === "Cancelada"
                            ? "text-bg-danger"
                            : "text-bg-warning"
                      }`}
                    >
                      {reserva.status}
                    </span>

                  </div>



                  <div className="mb-3">

                    <p className="mb-2">
                      📅 <strong>Data:</strong>{" "}
                      {reserva.data}
                    </p>

                    <p className="mb-2">
                      🕐 <strong>Horário:</strong>{" "}
                      {reserva.horario}
                    </p>

                    <p className="mb-2">
                      👥 <strong>Pessoas:</strong>{" "}
                      {reserva.pessoas}
                    </p>

                    <p className="mb-2">
                      📞 <strong>Telefone:</strong>{" "}
                      {reserva.telefone}
                    </p>

                  </div>


                  {/* OBSERVAÇÃO */}

                  {reserva.observacao && (

                    <div className="bg-light rounded p-3 mb-3">

                      <small className="text-secondary">
                        Observação
                      </small>

                      <p className="mb-0 mt-1">
                        {reserva.observacao}
                      </p>

                    </div>

                  )}


                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-outline-primary flex-fill"
                      onClick={() => editarReserva(reserva.id)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-outline-danger flex-fill"
                      onClick={() => removerReserva(reserva.id)}
                    >
                      Remover
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>

  );

}

export default App;