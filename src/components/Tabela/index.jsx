import "./styles.css";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ModalPeriodoEditar from "../ModalPeriodoEditar";
import ModalPeriodoApagar from "../ModalPeriodoApagar";

const cabecalhos = [
    { campo: "id", label: "#", hidden: true },
    { campo: "curso", label: "Curso" },
    { campo: "periodo", label: "Período" },
    { campo: "desafios", label: "Desafios" },
    { campo: "editar", label: "Editar", hidden: true },
    { campo: "apagar", label: "Apagar", hidden: true },
];

function CadastroItem({ cadastro, posicao, handleUpdate }) {
    return (
        <tr>
            <th>{posicao}</th>

            {cabecalhos
                .filter(({ hidden }) => !hidden)
                .map(({ campo }, i) => {
                    const valorCampo = cadastro[campo];

                    const valorReal = Array.isArray(valorCampo)
                        ? valorCampo.join("; ")
                        : valorCampo;

                    return <td key={i}>{valorReal}</td>;
                })}

            <th>
                <ModalPeriodoEditar
                    cadastro={cadastro}
                    posicao={posicao}
                    handleUpdate={handleUpdate}
                />
            </th>

            <th>
                <ModalPeriodoApagar
                    posicao={posicao}
                    handleUpdate={handleUpdate}
                />
            </th>
        </tr>
    );
}

function Tabela({ handleUpdate }) {
    const cadastrosStorage = localStorage.getItem("cadastros");

    const cadastros = cadastrosStorage ? JSON.parse(cadastrosStorage) : [];

    return (
        <div className="divTabelaScroll">
            <div className="divTabela">
                <Table className="tabelaCadastro" striped hover bordered>
                    <thead>
                        <tr>
                            {cabecalhos.map(({ label }, i) => (
                                <th key={i}>{label}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {cadastros.map((cadastro, i) => (
                            <CadastroItem
                                key={i}
                                cadastro={cadastro}
                                posicao={i}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Tabela;
