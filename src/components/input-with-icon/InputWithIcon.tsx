import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ChangeEventHandler, FC } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    icon: IconProp;
    value: number|string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

export const InputWithIcon: FC<Props> = ({ icon, value, placeholder, onChange, disabled }) => (
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
