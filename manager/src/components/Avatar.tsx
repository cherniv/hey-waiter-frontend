import React from 'react';
import Auth from '../services/Auth';
import { Image } from 'react-bootstrap';

type Props = {
    size?: number,

  }

const Avatar: React.FC<Props> = (props) => {
  var {firebaseUser} = Auth;
  var size = props.size || 18;
  const AVATARS_API_PATH = `https://ui-avatars.com/api/?size=${size}&font-size=0.7&name=`;
  var path = (firebaseUser && firebaseUser.photoURL) || (AVATARS_API_PATH + firebaseUser.displayName);
  return (
    <Image src={path} width={size} height={size} roundedCircle /> 
  )
}

export default Avatar;