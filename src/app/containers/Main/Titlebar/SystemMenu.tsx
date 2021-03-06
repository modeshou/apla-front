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

import React from 'react';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';

import SystemMenu from 'components/Main/Titlebar/SystemMenu';

export interface ISystemMenuContainerProps {
    align: 'left' | 'right';
}

interface ISystemMenuContainerState {
    locale: string;
}

interface ISystemMenuContainerDispatch {
    modalShow: typeof modalShow;
}

const SystemMenuContainer: React.SFC<ISystemMenuContainerProps & ISystemMenuContainerState & ISystemMenuContainerDispatch> = (props) => {
    const onAbout = () => {
        props.modalShow({
            id: 'ABOUT',
            type: 'ABOUT',
            params: {}
        });
    };

    const onChangeLocale = () => {
        props.modalShow({
            id: 'CHANGE_LOCALE',
            type: 'CHANGE_LOCALE',
            params: {
                value: props.locale
            }
        });
    };

    return (
        <SystemMenu align={props.align} onAbout={onAbout} onChangeLocale={onChangeLocale} />
    );
};

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale
});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect<ISystemMenuContainerState, ISystemMenuContainerDispatch, ISystemMenuContainerProps>(mapStateToProps, mapDispatchToProps)(SystemMenuContainer);