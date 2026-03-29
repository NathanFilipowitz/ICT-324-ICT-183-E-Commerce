import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, ButtonToolbar, Button, PasswordInput } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import bcrypt from "bcrypt";

// 🔹 Déplacé en dehors
const FormField = ({ name, label, text, ...props }) => (
    <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control name={name} {...props} />
        {text && <Form.Text>{text}</Form.Text>}
    </Form.Group>
);

export default function LoginPage() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({ name: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        if (!formValue.name) {
            setError("Nom d'utilisateur requis");
            return;
        }

        const cryptpassword = await bcrypt.cryptpassword(formValue.password, 10);

        try {
            const res = await fetch('http://localhost:3000/api/verifier-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formValue.name,
                    password: cryptpassword
                })
            });

            const data = await res.json();

            if (!data.user_id) {
                alert("Utilisateur ou mot de passe invalide");
                return;
            }

            localStorage.setItem("user_id", data.user_id);
            navigate(`/home`);

        } catch (err) {
            setError("Erreur serveur");
        }
    };

    return (
        <Container style={{ maxWidth: 400, marginTop: 100 }}>
            <Form formValue={formValue} onChange={setFormValue}>
                <Form.Control
                    name="name"
                    label="Utilisateur"
                    text={error || "Nom d'utilisateur requis."}
                />

                <Form.Control
                    name="password"
                    label="Mot de passe"
                    accepter={PasswordInput}
                    text="Mot de passe requis."
                />

                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Container>
    );
}