// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react';
import { StyledMenuItem } from './MenuItem';
import * as propTypes from 'prop-types';
import { TProtypoElement } from 'apla/protypo';

export interface IMenuGroupProps {
    title?: string;
    icon?: string;
    params?: { [key: string]: any };
    childrenTree?: TProtypoElement[];
}

const MenuGroup: React.SFC<IMenuGroupProps> = (props, context) => (
    <StyledMenuItem>
        <a href="#" onClick={() => context.menuPush({ name: props.title, content: props.childrenTree })}>
            <span className="link-body">
                {props.icon && (<em className={`icon ${props.icon}`} />)}
                <span>{props.title}</span>
            </span>
        </a>
    </StyledMenuItem>
);

MenuGroup.contextTypes = {
    menuPush: propTypes.func.isRequired
};

export default MenuGroup;