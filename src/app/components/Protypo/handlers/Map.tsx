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
import { TMapType, IMapEditorEvent } from 'apla/geo';

import MapView from 'components/Map/MapView';

export interface IMapProps {
    value: string;
    maptype: TMapType;
    hmap: string;
}

export interface IMapValue extends IMapEditorEvent {
    zoom?: number;
    center?: [number, number];
}

const mapTypes = ['point', 'line', 'polygon'];

export const parseData = (plain: string): IMapValue => {
    const result: IMapValue = {
        type: 'point',
        coords: [],
        area: 0,
        address: ''
    };

    try {
        const value = JSON.parse(plain);
        if (Array.isArray(value.coords)) {
            value.coords.forEach((l: any) => {
                if (Array.isArray(l)) {
                    if ('number' === typeof l[0] && 'number' === typeof l[1]) {
                        result.coords.push([l[0], l[1]]);
                    }
                }
            });
        }

        if (mapTypes.includes(value.type)) {
            result.type = value.type;
        }

        if (value.center) {
            if ('number' === typeof value.center.lng && 'number' === typeof value.center.lat) {
                result.center = [value.center.lat, value.center.lng];
            }
        }

        if ('number' === typeof value.area) {
            result.area = value.area;
        }

        if ('number' === typeof value.zoom) {
            result.zoom = value.zoom;
        }

        if ('string' === typeof value.address) {
            result.address = value.address;
        }

    }
    catch (e) {
        // Suppress errors silently
    }

    return result;
};

const InputMap: React.SFC<IMapProps> = (props) => {
    const value: IMapValue = parseData(props.value) || {
        type: 'point',
        coords: [],
        area: 0,
        address: ''
    };

    let height = parseInt(props.hmap, 10);
    if (!height) {
        height = 100;
    }

    return (
        <MapView
            tool={value.type}
            height={height}
            mapType={props.maptype}
            coords={value.coords}
            center={value.center}
            zoom={value.zoom}
        />
    );
};

export default InputMap;