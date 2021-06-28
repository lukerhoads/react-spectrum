/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {classNames, SlotProvider, useFocusableRef, useStyleProps} from '@react-spectrum/utils';
import {DOMProps, FocusableRef, SpectrumLabelableProps, StyleProps} from '@react-types/shared';
import {Field} from '../../label';
import React, {ReactNode, useRef} from 'react';
import styles from '@adobe/spectrum-css-temp/components/searchwithin/vars.css';
import {useLabel} from '@react-aria/label';
import {useProviderProps} from '@react-spectrum/provider';

export interface SpectrumSearchWithinProps extends SpectrumLabelableProps, DOMProps, StyleProps {
  children: ReactNode,
  /** Whether the children should be disabled. Propagated to both children. */
  isDisabled?: boolean
}

function SearchWithin(props: SpectrumSearchWithinProps, ref: FocusableRef<HTMLElement>) {
  props = useProviderProps(props);
  let {styleProps} = useStyleProps(props);
  let {labelProps} = useLabel(props);
  let {
    children,
    isDisabled,
    isRequired
  } = props;

  let inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();
  let domRef = useFocusableRef(ref, inputRef);

  let defaultSlotValues = {isDisabled, isRequired, label: undefined, isQuiet: false, 'aria-labelledby': labelProps.id};
  let searchFieldClassName = classNames(styles, 'spectrum-Textfield');
  let pickerClassName = classNames(styles, 'spectrum-Dropdown');
  let slots = {
    searchfield: {UNSAFE_className: searchFieldClassName, ...defaultSlotValues},
    picker: {UNSAFE_className: pickerClassName, ...defaultSlotValues}
  };

  return (
    <Field
      {...props}
      labelProps={labelProps}
      ref={domRef}>
      <div
        role="group"
        aria-labelledby={labelProps.id}
        className={classNames(styles, 'spectrum-SearchWithin', styleProps.className)}>
        <SlotProvider slots={slots}>
          {children}
        </SlotProvider>
      </div>
    </Field>
  );
}

/**
 * A SearchWithin combines a SearchField and a Picker into a single group. This allows a user to constrain the scope of their search to a particular category, for example.
 */
const _SearchWithin = React.forwardRef(SearchWithin);
export {_SearchWithin as SearchWithin};