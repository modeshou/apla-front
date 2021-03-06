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
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { TMenu } from 'apla/content';
import platform from 'lib/platform';

import StackGroup from 'components/Animation/StackGroup';
import themed from 'components/Theme/themed';
import Protypo from 'containers/Widgets/Protypo';
import ResizeHandle from 'containers/Main/Navigation/ResizeHandle';
import ScrollView from 'components/ScrollView';

const StyledNavigation = themed.aside`
    &.navigation-collapsed {
        overflow: hidden;
        width: 0;
    }
    
    .scrollarea {
        background: ${props => props.theme.menuBackground};
        height: 100%;
        
        .scrollbar-container {
            opacity: 0;
        }
    }

    position: absolute;
    top: ${platform.select({ win32: '1px' }) || 0};
    left: ${platform.select({ win32: '1px' }) || 0};
    bottom: ${platform.select({ win32: '1px' }) || 0};
    z-index: 150;
`;

const StyledBackButton = themed.button`
    position: relative;
    display: block;
    width: 100%;
    height: 58px;
    padding: 10px 25px;
    color: ${props => props.theme.menuPrimaryForeground};
    font-weight: 300;
    text-decoration: none;
    outline: none;
    border: none;
    text-align: left;
    background: transparent;
    
    &.disabled {
        &:hover {
            color: ${props => props.theme.menuPrimaryForeground};
        }
    }

    &:hover {
        color: ${props => props.theme.menuPrimaryActive};
    }

    .icon {
        vertical-align: top;
        display: inline-block;
        width: 30px;
    }

    em {
        font-size: 15px;
    }

    span {
        font-size: 21px;
        font-weight: 300;
    }
`;

const StyledMenu = themed.div`
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    top: ${props => props.theme.headerHeight + props.theme.menuHeight + props.theme.toolbarHeight}px;
`;

const StyledMenuContent = themed.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${props => props.theme.menuBackground};

    > div {
        background: ${props => props.theme.menuBackground};
    }

    .title-wrap {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export interface INavigationProps {
    preloading: boolean;
    preloadingError: string;
    visible: boolean;
    width: number;
    menus: TMenu[];
    menuPop: () => void;
}

class Navigation extends React.Component<INavigationProps & InjectedIntlProps> {
    render() {
        return (
            <StyledNavigation className={this.props.visible ? '' : 'navigation-collapsed'} style={{ width: this.props.visible ? this.props.width : 0 }}>
                <nav>
                    <StyledMenu>
                        <StackGroup
                            items={this.props.menus.map((menu, index) => (
                                <ScrollView disableHorizontal>
                                    <StyledMenuContent>
                                        {index > 0 && (
                                            <StyledBackButton onClick={() => this.props.menuPop()} disabled={1 >= this.props.menus.length}>
                                                <div className="title-wrap">
                                                    <span className="icon">
                                                        <em className="icon-arrow-left" />
                                                    </span>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </StyledBackButton>
                                        )}
                                        <Protypo
                                            context="menu"
                                            content={menu.content}
                                        />
                                    </StyledMenuContent>
                                </ScrollView>
                            ))}
                        />
                    </StyledMenu>
                </nav>
                <ResizeHandle />
            </StyledNavigation>
        );
    }
}

export default injectIntl(Navigation);