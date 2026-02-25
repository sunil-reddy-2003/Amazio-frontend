import { Outlet } from "react-router-dom"
import AdminNav from "../components/AdminNav";
import { useState } from "react";

const AdminLayout=()=>{
      const [searchText, setSearchText] = useState("");

    
    return(
        <div className="bg-linear-to-r from-gray-800  to-gray-400">
            <AdminNav onSearch={setSearchText} />
            <main>
                <Outlet context={{searchText}}/>
            </main>
        </div>
    )
}

export default AdminLayout;