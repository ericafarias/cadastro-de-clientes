import { useClients } from "../../api/listClient";
import Header from "../../components/Header";
import { columns } from "./columns";
import { DataTable } from "./Data-table";

const ListClient = () => {
    const data = useClients();

    return (
        <div>
            <Header />
            <div className="pb-5 px-10 font-bold">
                <h1 className="text-3xl ">Lista de clientes</h1>
            </div>
            <div className="px-10">
                <DataTable columns={columns} data={data?.data ?? []} />
            </div>
        </div>
    );
};

export default ListClient;
