import Aside from "../../../../components/aside/Aside"
import NavControlerProvider from "../../../../Context/NavControlerProvider";
import Nav from "../../../../components/nav/Nav"

export default async function AdminLayout({children, params}){
    const {type} = await params;
    return(
        <>
            <NavControlerProvider>
                <Nav type={type} />
                <div className="dashLayout">
                    <div className="d-1">
                        <Aside type={type} />
                    </div>
                    <div className="d-2">
                        {children} 
                    </div>
                </div>
            </NavControlerProvider>
        </>
    )
}