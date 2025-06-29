import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addDepartmentAsync } from '../store/DepartmentsSlice';

export default function ModalFormDepartments({ show, handleClose, editMode = false, editData = null, onSave }) {
    const dispatch = useDispatch();

    const initialFormData = {
        name: '',
        managerLastName: '',
        email: '',
        location: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const departmentsForm = [
        { label: 'Department Name', name: 'name', type: 'text' },
        { label: 'Manager Last Name', name: 'managerLastName', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Location', name: 'location', type: 'text' }
    ];

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
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.managerLastName.trim()) newErrors.managerLastName = 'Manager`s Last Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.location.trim()) newErrors.location = 'Location is required';
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
                dispatch(addDepartmentAsync({ id: Date.now(), ...formData }));
            }
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit Department' : 'Add Department'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {departmentsForm.map(({ label, name, type }) => (
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
