import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function Header() {

    const navigate = useNavigate();

    const handNavigate = (route) => {
        navigate(route);
    };

    return (
        <header>
            <ButtonGroup className='mb-3'>
                <Button onClick={() => handNavigate('/employees')}>Employees</Button>
                <Button onClick={() => handNavigate('/departments')}>Departments</Button>
            </ButtonGroup>
        </header>
    )
}
