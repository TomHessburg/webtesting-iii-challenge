import React from 'react';
import {render, fireEvent, getByTestId} from 'react-testing-library';
import renderer from 'react-test-renderer'; 
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'


import Dashboard from './Dashboard.js';
import Display from '../display/Display.js';
import Controls from '../controls/Controls.js';


describe('<Dashboard />', () => {
    it('renders successfully', () => {
        render(<Dashboard />);
    })

    it('matches snapshot', () => {
        const tree = renderer.create(<Dashboard />).toJSON();
    
        expect(tree).toMatchSnapshot();
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

    it('has red-led class when locked or closed', () => {
        const { getByText } = render(<Dashboard locked={true} />);
        const closeButton = getByText(/close gate/i);
        const lockButton = getByText(/lock gate/i);
        fireEvent.click(closeButton);
        fireEvent.click(lockButton);
        
        const lockDisplay = getByText(/locked/i);
        const closedDisplay = getByText(/closed/i);

        expect(lockDisplay).toHaveClass('red-led');
        expect(closedDisplay).toHaveClass('red-led');
    })
    it('has green-led class when open or unlocked', () => {
        const { getByText } = render(<Dashboard locked={true} />);

        const unlockDisplay = getByText(/unlocked/i);
        const openDisplay = getByText(/open/i);

        expect(unlockDisplay).toHaveClass('green-led');
        expect(openDisplay).toHaveClass('green-led');
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
 
 