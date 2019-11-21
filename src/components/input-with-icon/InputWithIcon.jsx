import React  from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InputWithIcon = ({ icon, value, placeholder, onChange, disabled }) => (
    <InputGroup>
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <FontAwesomeIcon
                    icon={icon}
                    size="sm"
                />
            </InputGroupText>
        </InputGroupAddon>
        <Input
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    </InputGroup>
);
