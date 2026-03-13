import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Container, Header, Content, Button, Grid, Row, Col, VStack, Center, Image, Heading, Text} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function ProductPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const id = searchParams.get('id');

    useEffect(() => {
        console.log(id);
    }, [id])

    return (
        <Container>
            <Center>
                <Header position={'top'}>
                    {/*<Navbar/>*/}
                </Header>
            </Center>
            <Content>
                <VStack alignItems={'center'} justifyContent="flex-start">
                    <Heading level={1} marginBottom={20}>Product Page</Heading>
                    {id && <h1>ID n° {id}</h1>}
                    <Grid fluid>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Center>
                                    <Image
                                        src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=416"
                                        alt="black and white short coated dog"
                                    />
                                </Center>
                            </Col>
                            <Col span="auto">
                                <Heading level={5}>Product title</Heading>
                                <Text>Product description</Text>
                            </Col>
                        </Row>
                    </Grid>
                    <Button
                        appearance='default'
                        onClick={() => navigate("/home")}
                        marginTop={50}
                    >
                        Back to catalog
                    </Button>
                </VStack>
            </Content>
        </Container>
    );
}
