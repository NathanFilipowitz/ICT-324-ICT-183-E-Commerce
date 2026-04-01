import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, ButtonToolbar, Button, PasswordInput } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

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

        try {
            const res = await fetch('http://localhost:3000/api/verifier-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formValue.name,
                    password: formValue.password,
                })

            });

            const data = await res.json();

            if (!data.token) {
                alert("Utilisateur ou mot de passe invalide");
                return;
            }

            localStorage.setItem("JWT", data.token);
            navigate(`/home`);

        } catch (err) {
            setError("Erreur serveur");
        }
    };

    return (
        <Container style={{ maxWidth: 400, marginTop: 100 }}>
            <Form formValue={formValue} onChange={setFormValue}>
                <FormField
                    name="name"
                    label="Utilisateur"
                    text={error || "Nom d'utilisateur requis."}
                />

                <FormField
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
                        <Button appearance="primary" onClick={() => navigate("/register")}>
                            Créer un compte
                        </Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Container>
    );
}