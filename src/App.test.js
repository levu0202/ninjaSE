import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react'

import Model from './model/Model.js';

import { roomLevelOne } from './model/Room.js';
var tRoomLevelOne = JSON.parse(JSON.stringify(roomLevelOne));
var testModel = new Model(tRoomLevelOne);
test('No moves when model created', () => {

    expect(testModel.moveCount).toBe(0)
});
  