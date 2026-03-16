import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Container, Header, Content, Button, Grid, Row, Col, VStack, Center, Image, Heading, Text, HStack} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function ProductPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const id = searchParams.get('id');

    const handleFetch = async () => {
    }

    const getProduct = async () => {
        const result = await fetch(`/api/product/${id}`);
        return await result.json()
    }

    useEffect(() => {
        async function getProduct() {
            const result = await fetch(`/api/product/${id}`);
            const product = await result.json()
            setProduct(product);
        }

        getProduct();
    }, [id])

    return (
        <>
            <Button
                appearance='default'
                onClick={() => navigate("/home")}
                marginTop={50}
                position={'absolute'}
                top={10}
                left={20}
            >
                Back to catalog
            </Button>
            <Container>
                <Center>
                    <Header position={'top'}>
                        {/*<Navbar/>*/}
                    </Header>
                </Center>
                <Content height={500}>
                    <VStack alignItems={'center'} justifyContent="flex-start">
                        <Heading level={1} marginTop={0} marginBottom={100}>Product Page</Heading>
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
                                    <Heading marginBottom={10} level={5}>{product.name}</Heading>
                                    <Text marginBottom={1}>{product.price} CHF</Text>
                                    <Text>Stock: {product.stock}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </VStack>
                </Content>
            </Container>
        </>
    );
}
