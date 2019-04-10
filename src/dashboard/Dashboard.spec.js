import React from 'react';
import {render, fireEvent, getByTestId} from 'react-testing-library';
import renderer from 'react-test-renderer'; 
import 'react-testing-library/cleanup-after-each';


import Dashboard from './Dashboard.js';
import Display from '../display/Display.js';
import Controls from '../controls/Controls.js';


describe('<Dashboard />', () => {
    it('renders successfully', () => {
        render(<Dashboard />);
    })

    describe('Gate', () => {
        it('renders unlocked on load', () => {
            const { getByText } = render(<Display />);
            getByText(/unlocked/i);
        })
    
        it('renders open on load', () => {
            const { getByText } = render(<Display />);
            getByText(/open/i);
        })
    })

})

describe('<Display />', () => {
    it('renders successfully', () => {
        render(<Display />);
    })
    it('displays Closed if closed prop is true', () => {
        const { getByText } = render(<Display closed={true} />);
        getByText(/closed/i);
    })
    it('displays Locked if locked prop is true', () => {
        const { getByText } = render(<Display locked={true} />);
        getByText(/locked/i);
    })
})

describe('<Controls />', () => {
    it('renders successfully', () => {
        render(<Controls />);
    })
    it('provides buttons for toggling close and locked states', () => {
        const { getByText } = render(<Controls />);
        getByText(/lock gate/i);
        getByText(/close gate/i);
    })
    it('dosnt allow locking of gate if gate is open', () => {
        const { getByText } = render(<Dashboard />);
        const lockButton = getByText(/lock gate/i);
        fireEvent.click(lockButton);
        getByText(/Unlocked/i);
    })
    it('dosnt allow opening when locked', () => {
        const { getByText } = render(<Dashboard />);

        const closeButton = getByText(/close gate/i);
        const lockButton = getByText(/lock gate/i);

        fireEvent.click(closeButton);
        fireEvent.click(lockButton);

        const openButton = getByText(/open gate/i);
        fireEvent.click(openButton);

        getByText(/Locked/i);
        getByText(/Closed/i);
    })
})
 
 