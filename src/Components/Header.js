import '../styles/header.css'
import bg_image from '../images/illu_bg_one_1.svg'
import logo from '../images/logo1.png'

function Header() {  
    return(
        <div>
             <div className='row'>
                <div className='col col-lg-5' id='mydivone'>
                    <img src={logo} className='img_logo' />
                </div>
                <div className='col' id='mydiv' style={{overflow: 'hidden',height:'190px'}}>
                    <img src={bg_image} className='myimg' id='img_one' style={{width:'100%', height:'100%'}}/>
                </div>
            </div>  

            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-1 mb-3 bg-body ">

                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='container-fluid'>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a className='nav-link active fs-7 fw-bold ms-3' aria-current='page' href='#'>Généralités</a>
                            </li>

                            <li class='nav-item dropdown'>
                                <a class='nav-link active fs-7 fw-bold ms-3' aria-current='page' href='#'>Délais</a>
                            </li> 

                            <li className='nav-item'>
                                <a className='nav-link fs-7 fw-bold ms-3 text-dark' href='#'>Utilisation de la solution</a>
                            </li>       
                        </ul>
                    </div>
                </div>
            </nav>            
        </div>      
    )

}
export default Header;