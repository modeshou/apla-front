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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { constructorRedo } from '../actions';
import constructorRedoEpic from './constructorRedoEpic';
import dependencies from 'modules/dependencies';
import { TProtypoElement } from 'apla/protypo';
import { TConstructorTreeElement } from 'apla/editor';
import mockStore from 'test/mockStore';

describe('constructorRedoEpic', () => {
    it('undo test', () => {

        const action$ = ActionsObservable.of<Action>(constructorRedo.started(null));

        const jsonData: TProtypoElement[] = [
            {
                tag: 'image',
                attr: {
                    alt: 'Image',
                    src: '/img/dummy.png'
                },
                id: 'tag_0'
            },
            {
                tag: 'p',
                attr: {
                    'class': 'text-primary'
                },
                children: [
                    {
                        tag: 'text',
                        text: 'Paragraph text here',
                        id: 'tag_2'
                    }
                ],
                id: 'tag_1',
                childrenText: 'Paragraph text here'
            },
            {
                tag: 'form',
                children: [
                    {
                        tag: 'label',
                        children: [
                            {
                                tag: 'text',
                                text: 'Firstname:',
                                id: 'tag_5'
                            }
                        ],
                        id: 'tag_4',
                        childrenText: 'Firstname:'
                    },
                    {
                        tag: 'input',
                        attr: {
                            'class': 'form-control',
                            name: 'sample input'
                        },
                        id: 'tag_6'
                    }
                ],
                id: 'tag_3',
                childrenText: null
            },
            {
                tag: 'form',
                children: [
                    {
                        tag: 'label',
                        children: [
                            {
                                tag: 'text',
                                text: 'Lastname:',
                                id: 'tag_9'
                            }
                        ],
                        id: 'tag_8',
                        childrenText: 'Lastname:'
                    },
                    {
                        tag: 'input',
                        attr: {
                            'class': 'form-control',
                            name: 'sample input'
                        },
                        id: 'tag_10'
                    },
                    {
                        tag: 'button',
                        children: [
                            {
                                tag: 'text',
                                text: 'Submit',
                                id: 'tag_12'
                            }
                        ],
                        id: 'tag_11',
                        childrenText: 'Submit'
                    }
                ],
                id: 'tag_7',
                childrenText: null
            },
            {
                tag: 'table',
                id: 'tag_13',
                attr: {
                    source: 'keysStr',
                    columns: 'KEY_ID=id,MONEY=amount'
                }
            },
            {
                tag: 'imageinput',
                id: 'tag_14',
                attr: {
                    format: 'jpg',
                    name: 'sample image',
                    ratio: '2/1',
                    width: '100'
                }
            }
        ];

        const treeData: TConstructorTreeElement[] = [
            {
                title: 'image',
                children: null,
                expanded: true,
                id: 'tag_0',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: false,
                tag: {
                    tag: 'image',
                    attr: {
                        alt: 'Image',
                        src: '/img/dummy.png'
                    },
                    id: 'tag_0'
                }
            },
            {
                title: 'p: Paragraph text here',
                children: null,
                expanded: true,
                id: 'tag_1',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: true,
                tag: {
                    tag: 'p',
                    attr: {
                        'class': 'text-primary'
                    },
                    children: [
                        {
                            tag: 'text',
                            text: 'Paragraph text here',
                            id: 'tag_2'
                        }
                    ],
                    id: 'tag_1',
                    childrenText: 'Paragraph text here'
                }
            },
            {
                title: 'form',
                children: [
                    {
                        title: 'label: Firstname:',
                        children: null,
                        expanded: true,
                        id: 'tag_4',
                        selected: false,
                        logic: false,
                        canMove: true,
                        canDrop: true,
                        tag: {
                            tag: 'label',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Firstname:',
                                    id: 'tag_5'
                                }
                            ],
                            id: 'tag_4',
                            childrenText: 'Firstname:'
                        }
                    },
                    {
                        title: 'input',
                        children: null,
                        expanded: true,
                        id: 'tag_6',
                        selected: false,
                        logic: false,
                        canMove: true,
                        canDrop: false,
                        tag: {
                            tag: 'input',
                            attr: {
                                'class': 'form-control',
                                name: 'sample input'
                            },
                            id: 'tag_6'
                        }
                    }
                ],
                expanded: true,
                id: 'tag_3',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: true,
                tag: {
                    tag: 'form',
                    children: [
                        {
                            tag: 'label',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Firstname:',
                                    id: 'tag_5'
                                }
                            ],
                            id: 'tag_4',
                            childrenText: 'Firstname:'
                        },
                        {
                            tag: 'input',
                            attr: {
                                'class': 'form-control',
                                name: 'sample input'
                            },
                            id: 'tag_6'
                        }
                    ],
                    id: 'tag_3',
                    childrenText: null
                }
            },
            {
                title: 'form',
                children: [
                    {
                        title: 'label: Lastname:',
                        children: null,
                        expanded: true,
                        id: 'tag_8',
                        selected: false,
                        logic: false,
                        canMove: true,
                        canDrop: true,
                        tag: {
                            tag: 'label',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Lastname:',
                                    id: 'tag_9'
                                }
                            ],
                            id: 'tag_8',
                            childrenText: 'Lastname:'
                        }
                    },
                    {
                        title: 'input',
                        children: null,
                        expanded: true,
                        id: 'tag_10',
                        selected: false,
                        logic: false,
                        canMove: true,
                        canDrop: false,
                        tag: {
                            tag: 'input',
                            attr: {
                                'class': 'form-control',
                                name: 'sample input'
                            },
                            id: 'tag_10'
                        }
                    },
                    {
                        title: 'button: Submit',
                        children: null,
                        expanded: true,
                        id: 'tag_11',
                        selected: false,
                        logic: false,
                        canMove: true,
                        canDrop: true,
                        tag: {
                            tag: 'button',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Submit',
                                    id: 'tag_12'
                                }
                            ],
                            id: 'tag_11',
                            childrenText: 'Submit'
                        }
                    }
                ],
                expanded: true,
                id: 'tag_7',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: true,
                tag: {
                    tag: 'form',
                    children: [
                        {
                            tag: 'label',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Lastname:',
                                    id: 'tag_9'
                                }
                            ],
                            id: 'tag_8',
                            childrenText: 'Lastname:'
                        },
                        {
                            tag: 'input',
                            attr: {
                                'class': 'form-control',
                                name: 'sample input'
                            },
                            id: 'tag_10'
                        },
                        {
                            tag: 'button',
                            children: [
                                {
                                    tag: 'text',
                                    text: 'Submit',
                                    id: 'tag_12'
                                }
                            ],
                            id: 'tag_11',
                            childrenText: 'Submit'
                        }
                    ],
                    id: 'tag_7',
                    childrenText: null
                }
            },
            {
                title: 'table',
                children: null,
                expanded: true,
                id: 'tag_13',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: false,
                tag: {
                    tag: 'table',
                    id: 'tag_13',
                    attr: {
                        source: 'keysStr',
                        columns: 'KEY_ID=id,MONEY=amount'
                    }
                }
            },
            {
                title: 'imageinput',
                children: null,
                expanded: true,
                id: 'tag_14',
                selected: false,
                logic: false,
                canMove: true,
                canDrop: false,
                tag: {
                    tag: 'imageinput',
                    id: 'tag_14',
                    attr: {
                        format: 'jpg',
                        name: 'sample image',
                        ratio: '2/1',
                        width: '100'
                    }
                }
            }
        ];

        const expectedOutput: any = [
            {
                payload: {
                    params: null,
                    result: {
                        jsonData: jsonData,
                        treeData: treeData,
                        position: 3,
                        canUndo: true,
                        canRedo: false
                    }
                },
                type: 'editor/CONSTRUCTOR_REDO_DONE'
            }
        ];

        constructorRedoEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});