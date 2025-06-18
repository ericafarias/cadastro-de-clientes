import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "../components/ui/button";
import { Plus, Users } from "lucide-react";
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center mt-40 ">
                <Card width="300px" height="400px" flexDirection="column">
                    <Link to="/list">
                        <Button className="animate__animated animate__bounceInLeft min-w-44">
                            <Users />
                            Listar clientes
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button className="animate__animated animate__bounceInRight min-w-44">
                            <Plus />
                            Adicionar cliente
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Home;
