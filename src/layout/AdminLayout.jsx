import { Outlet, Link } from "react-router";

function AdminLayout(){
    return(
        <>
            <header>
                <nav className="nav bg-light">
                    <Link className="nav-link" to="/admin/products">產品列表</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center">
                <p>© 2025 All Rights Reserved</p>
            </footer>
        </>
    )
}

export default AdminLayout