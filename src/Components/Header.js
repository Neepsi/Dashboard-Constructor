import './Header.css'
import bg_image from './images/illu_bg_one_1.svg'
import logo from './images/logo1.png'
const Header = ({oneBlockVisi,twoBlockVisi}) =>
{
    
    return(
        <div>
             <div class="row" id='zol'>
                <div class="col col-lg-5" id='mydivone'>
                    <img src={logo} class="img_logo" />
                </div>
                <div class="col" id='mydiv' style={{overflow: 'hidden',height:'190px'}}>
                <img src={bg_image} className='myimg' id="img_one" style={{width:'100%', height:'100%'}}/>
                </div>
            </div>  

            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-1 mb-3 bg-body rounded">

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <a class="nav-link active fs-7 fw-bold ms-3" aria-current="page" href="#">Généralités</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle fs-7 fw-bold ms-3 text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Délais</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item fs-8 fw-bold" href="#">Délais globaux</a></li>
                                        <li><a class="dropdown-item fs-8 fw-bold" href="#">Délais partiels</a></li>
                                    </ul>
                            </li> 

                            <li class="nav-item">
                                <a class="nav-link fs-7 fw-bold ms-3 text-dark" href="#">Utilisation de la solution</a>
                            </li>       
                        </ul>
                    </div>
                </div>
            </nav>            
        </div>      
    )

}
export default Header;