import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    Container,
    Header,
    NumberInput,
    InputGroup,
    Button,
    Grid,
    Row,
    Col,
    VStack,
    Center,
    Image,
    Heading,
    Text,
    HStack
} from 'rsuite';
import {FaPlus, FaMinus} from 'react-icons/fa';
import {loremIpsum} from 'react-lorem-ipsum';
import 'rsuite/dist/rsuite.min.css';

export default function ProductPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const [value, setValue] = useState(0);
    const id = searchParams.get('id');

    const handleAddCart = () => {
        console.log("Pressed Cart Button");
    }

    const handleMinus = () => {
        setValue(parseInt(value, 10) - 1);
    };
    const handlePlus = () => {
        setValue(parseInt(value, 10) + 1);
    };

    useEffect(() => {
        // Method to call async function in useEffect
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
                marginTop={20}
                position={'absolute'}
                top={10}
                left={20}
            >
                Back to catalog
            </Button>
            <Container style={{ padding: '20px 50px' }}>
                <Header position={'top'}>
                    {/*<Navbar/>*/}
                </Header>
                <Grid fluid>
                    <Row gutter={[50, 10]}>
                        <Col span={12}>
                            <Center>
                                <Image
                                    src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=416"
                                    alt="black and white short coated dog"
                                    style={{width: '30vw'}}
                                />
                            </Center>
                        </Col>
                        <Col span={12}>
                            <VStack spacing={20}>
                                <Heading marginBottom={10} level={1}>{product.name}</Heading>
                                <Heading marginBottom={1} level={3}>{product.price} CHF</Heading>
                                <Text>Stock: {product.stock}</Text>
                                <Text>
                                    {loremIpsum()}
                                </Text>
                                <InputGroup inside style={{width: '100px'}}>
                                    <InputGroup.Button onClick={handleMinus} appearance="default">
                                        <FaMinus size={10}/>
                                    </InputGroup.Button>
                                    <NumberInput value={value} onChange={setValue} controls={false}/>
                                    <InputGroup.Button onClick={handlePlus} appearance="default">
                                        <FaPlus size={10}/>
                                    </InputGroup.Button>
                                </InputGroup>
                                <Button
                                    appearance='default'
                                    onClick={() => handleAddCart()}
                                >
                                    Add to cart
                                </Button>
                            </VStack>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    );
}
