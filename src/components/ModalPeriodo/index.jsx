import "./styles.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";

function DesafioItem({ desafio, onClick }) {
    return (
        <div className="desafioItem">
            <span className="desafioItemSpan">{desafio}</span>

            <button className="desafioItemButton" onClick={onClick}>
                <RxCross1 className="desafioItemIcon" />
            </button>
        </div>
    );
}

function ModalPeriodo({ handleUpdate }) {
    const [curso, setCurso] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [desafios, setDesafios] = useState([]);

    const [modalVisivel, setModalVisivel] = useState(false);

    const handleSubmit = () => {
        const cadastrosStorage = localStorage.getItem("cadastros");

        const cadastros = cadastrosStorage ? JSON.parse(cadastrosStorage) : [];

        const novoCadastro = { curso, periodo, desafios };

        cadastros.push(novoCadastro);

        localStorage.setItem("cadastros", JSON.stringify(cadastros));

        mudarVisibilidade();
        handleUpdate();
    };

    const handleAdicionarDesafio = () => {
        const desafio = window.prompt("Nome do Desafio:");

        const copiaDesafios = JSON.parse(JSON.stringify(desafios));

        copiaDesafios.push(desafio);

        setDesafios(copiaDesafios);
    };

    const handleRemoverDesafio = (desafio) => {
        const copiaDesafios = JSON.parse(JSON.stringify(desafios));

        const indexDesafio = copiaDesafios.findIndex((des) => desafio === des);

        copiaDesafios.splice(indexDesafio, 1);

        setDesafios(copiaDesafios);
    };

    const mudarVisibilidade = () => {
        setModalVisivel((show) => !show);
    };

    const limparCampos = () => {
        setCurso("");
        setPeriodo("");
        setDesafios([]);
    };

    useEffect(() => {
        if (!modalVisivel) limparCampos();
    }, [modalVisivel]);

    return (
        <>
            <Button variant="success" onClick={mudarVisibilidade}>
                Cadastrar
            </Button>

            <Modal
                show={modalVisivel}
                onHide={mudarVisibilidade}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Período</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalPeriodoBody">
                    <FloatingLabel label="Curso">
                        <Form.Control
                            placeholder="Curso"
                            value={curso}
                            onChange={(e) => setCurso(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Período">
                        <Form.Control
                            placeholder="Período"
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                        />
                    </FloatingLabel>

                    <div className="inputDesafios">
                        <div className="inputDesafiosItems">
                            {desafios.length > 0
                                ? desafios.map((desafio, i) => (
                                      <DesafioItem
                                          key={i}
                                          desafio={desafio}
                                          onClick={() =>
                                              handleRemoverDesafio(desafio)
                                          }
                                      />
                                  ))
                                : "Desafios"}
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleAdicionarDesafio}
                        >
                            Adicionar Desafio
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={mudarVisibilidade}>
                        Cancelar
                    </Button>

                    <Button variant="success" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPeriodo;
