import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 0,
  },
  typography: {
    margin: theme.spacing.unit * 2,
	 width: 'auto',
	 maxWidth: 900
  },
})

class AnchorPlayground extends React.Component {
  state = {
    open: false,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 200,
    positionLeft: 400,
    anchorReference: 'anchorEl',
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    })
  }

  handleNumberInputChange = key => event => {
    this.setState({
      [key]: parseInt(event.target.value, 10),
    })
  }

  handleClickButton = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  anchorEl = null

  render() {
    const { classes, note, action } = this.props
    const {
      open,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference,
    } = this.state

    return (
      <div>
        <Grid container justify="center" spacing={0}>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              variant="flat"
							size="small"
							fullWidth
              className={classes.button}
              onClick={this.handleClickButton}
            >
              {(action === "add_proserv_note") ? 'Agent Note' : action}
            </Button>
        </Grid>
        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <Typography className={classes.typography}>{note}</Typography>
        </Popover>
      </div>
    )
  }
}

AnchorPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AnchorPlayground)
