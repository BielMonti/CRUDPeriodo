import "./styles.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";

function ModalPeriodoApagar({ posicao, handleUpdate }) {
    const [modalVisivel, setModalVisivel] = useState(false);

    const handleSubmit = () => {
        const cadastrosStorage = localStorage.getItem("cadastros");

        const cadastros = JSON.parse(cadastrosStorage);

        cadastros.splice(posicao, 1);

        localStorage.setItem("cadastros", JSON.stringify(cadastros));

        mudarVisibilidade();
        handleUpdate();
    };

    const mudarVisibilidade = () => {
        setModalVisivel((show) => !show);
    };

    return (
        <>
            <Button variant="danger" onClick={mudarVisibilidade}>
                <BsTrashFill />
            </Button>

            <Modal
                show={modalVisivel}
                onHide={mudarVisibilidade}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Apagar Período #{posicao}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span>Ao confirmar, os dados serão apagados para sempre.</span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={mudarVisibilidade}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={handleSubmit}>
                        Apagar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPeriodoApagar;
