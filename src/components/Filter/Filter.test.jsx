import { render, screen, cleanup } from '@testing-library/react';
import Filter from './Filter';
import userEvent from '@testing-library/user-event';

describe('Filter Component', () => {
  const onChange = jest.fn();
  afterEach(cleanup);
  it('test render with props', () => {
    render(<Filter value={'hi'} onChange={onChange} />);
  });
  it('test render without props', () => {
    render(<Filter />);
  });
  it('Filter has Find Serial', () => {
    render(<Filter />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Find serial/i)).toBeInTheDocument();
  });
  it('test input placeholder', () => {
    render(<Filter />);
  });
  it('Filter has input', () => {
    render(<Filter />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('Filter snapshot', () => {
    expect(render(<Filter />)).toMatchSnapshot();
  });
  it('Filter empty snapshot', () => {
    expect(
      render(<Filter value={'hi'} onChange={onChange} />),
    ).toMatchSnapshot();
  });
  it('onChange works', () => {
    render(<Filter value={''} onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), 'rush');
    expect(onChange).toHaveBeenCalledTimes(4);
  });
  it('Icon render', () => {
    render(<Filter value={''} onChange={onChange} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
  it('typing in Filter works', () => {
    render(<Filter />);
    expect(screen.queryByDisplayValue(/rush/)).toBeNull();
    userEvent.type(screen.getByRole('textbox'), 'rush');
    expect(screen.queryByDisplayValue(/rush/)).toBeInTheDocument();
  });
});
