import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addEmployeeAsync } from '../store/EmployeesSlice';

export default function ModalFormEmployees({ show, handleClose, editMode = false, editData = null, onSave }) {
    const dispatch = useDispatch();

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: ''
    };


    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const employeesForm = [
        { label: 'First Name', name: 'firstName', type: 'text' },
        { label: 'Last Name', name: 'lastName', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Position', name: 'position', type: 'text' },
        { label: 'Department', name: 'department', type: 'text' },
    ]

    useEffect(() => {
        if (editMode && editData) {
            setFormData(editData);
        } else {
            setFormData(initialFormData);
        }
    }, [editMode, editData, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            if (editMode) {
                onSave(formData);
            } else {
                dispatch(addEmployeeAsync({ id: Date.now(), ...formData }));
            }
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {employeesForm.map(({ label, name, type }) => (
                        <Form.Group className="mb-3" key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                isInvalid={!!errors[name]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[name]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    ))}
                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {editMode ? 'Save Changes' : 'Add'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
