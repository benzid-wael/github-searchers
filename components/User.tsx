import React from 'react';
import styled from 'styled-components';

import UserModel from '../shared/user/user';
import ExternalLink from './ExternalLink';

const UserContainer = styled.div`
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export interface UserProps {
    data: UserModel;
    imgSize?: 'small' | 'large';
}

export const User: React.FC<UserProps> = (props: UserProps) => {
    const imgSize = props.imgSize || 'large';
    const user = props.data;
    const imgSizeInPixels = imgSize === 'small' ? 72 : 148;

    return (
        <UserContainer>
            <img
                src={user.avatarUrl}
                style={{
                    width: `${imgSizeInPixels}px`,
                    height: `${imgSizeInPixels}px`,
                    borderRadius: '50%',
                    margin: '4px',
                }}
            />
            <ExternalLink url={user.url} label={user.name} style={{ fontSize: '18px' }} />
        </UserContainer>
    );
};

export default User;
