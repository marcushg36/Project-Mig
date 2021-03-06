import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const options = [
  'None',
  'Marcus',
  'Edward',
  'Miekkal',
  'Tyler',
  'Tony',
  'Lucas',
  'Sarah'
]

export class UserPop extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state.value = this.props.value
  }

  state = {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  radioGroup = null

  handleEntering = () => {
    this.radioGroup.focus()
  }

  handleCancel = () => {
    this.props.onClose(this.props.value)
  }

  handleOk = () => {
    this.props.onClose(this.state.value)
	 	this.props.onChangeUser(this.state.value)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Agent Selection</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            name="agent"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

UserPop.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
	onChangeUser: PropTypes.func
}
