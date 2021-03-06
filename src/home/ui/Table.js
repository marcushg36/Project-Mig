import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import FirstPageIcon from 'material-ui-icons/FirstPage'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import LastPageIcon from 'material-ui-icons/LastPage'
import HomeFilter from '../containers/Filter'
import axios from 'axios'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    )
  }

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
)

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: "10%",
	 marginTop: 10,
  },
  tableWrapper: {
    overflowX: 'auto'
  },
})

class CustomPaginationActionsTable extends Component {
	componentWillMount() {
		this.props.listApi()
	}
	componentDidUpdate(prevProps) {
		if (prevProps.newStatus !== this.props.newStatus) {
			if (this.props.newStatus === true) {
				this.props.onAddNew()
			} else {
				if (this.props.data.some(x => x.status_name === "new")) {
					this.props.onRemoveNew()
				}
			}
		}
	}

	takeTicket = id => {
		const params = {
  		 user: this.props.user,
  		 provider: document.location.host.slice(2).replace(/\.com/, ''),
  		 service_type: 'websitetransfer',
  		 action: 'assign_transfer',
  		 lib: 'general',
  		 proserv_id: id,
		 toggle: (this.props.projectInfo.assigned_to === this.props.user) ? 'off' : 'on'
  	 	}
		axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&proserv_id=${params.proserv_id}&on_off=${params.toggle}`).then((res) => {
  		 console.log(`${JSON.stringify(res)}
  				 Exit Code: ${res.data.success}
  				 Response: ${res.data.note}
  			 `)
  			 if (res.data.success === 1) {
  				 this.props.grabList()
  			} else {
  				console.log(`Error: ${res.data.note}`)
  			}
		}).catch((error) => {
  			console.log("Issue with dispatching assigning API.. please report.")
		})
	}
	render() {
		const { classes, data, page, rowsPerPage, onChangePage=f=>f, onChangeRowsPerPage=f=>f, onSetUser=f=>f } = this.props
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
		const changeName = (name) => {
			switch(name) {
			  case "emuniz":
				 return "Edward Muniz"
				case "edmuniz":
					return "Edward Muniz"
			  case "shunt":
				 return "Sarah Hunt"
			  case "mclarkson":
				 return "Miekkal Clarkson"
			  case "toyler":
				 return "Tyler Oyler"
			  case "aanselmo":
				 return "Tony Anselmo"
			  case "lbejarano":
				 return "Lucas Bejarano"
			  case "mhancock-gaillard":
				 return "Marcus HG"
			  case "rloader":
				 return "Riley Loader"
			  case "aldunn":
				 return "Alan Dunn"
			  default:
				 return "Take"
		  }
		}
		return (
			<Paper className={classes.root}>

			  <HomeFilter />

	        <div className={classes.tableWrapper}>
	          <Table>
					 <TableHead>
			          <TableRow>
			            <TableCell numeric>#</TableCell>
			            <TableCell>Primary Domain</TableCell>
			            <TableCell numeric>Domains</TableCell>
			            <TableCell numeric>Emails</TableCell>
			            <TableCell>Date</TableCell>
			            <TableCell>Status</TableCell>
			            <TableCell>Owner</TableCell>
			          </TableRow>
					 </TableHead>
	            <TableBody>
	              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, key) => {
	                return (
	                  <TableRow key={key}>
							  			<TableCell numeric>{n.proserv_id}</TableCell>
	                    <TableCell style={{maxWidth:375,minWidth:345}}>
												<Button href={"/cgi/admin/proservice/project/"+n.proserv_id} onClick={() => onSetUser(n.assigned_to)} className={classes.button}>
								        	{n.domain}
								        </Button>
											</TableCell>
	                    <TableCell numeric>{n.domain_total}</TableCell>
	                    <TableCell numeric>{n.email_total}</TableCell>
							  			<TableCell>{n.added.replace(/(\d{2}:?){3}/, '')}</TableCell>
							  			<TableCell>{n.status}</TableCell>
							  			<TableCell>{(changeName(n.assigned_to) !== 'Take') ?
																		changeName(n.assigned_to) :
																		<Button disabled={(changeName(n.assigned_to) === 'Take') ?
																			false :
																			true}
																			onClick={(changeName(n.assigned_to) === 'Take') ?
																				() => alert("Feature still in progress..") :
																				null}
																		>{changeName(n.assigned_to)}</Button>}
											</TableCell>
	                  </TableRow>
	                )
	              })}
	              {emptyRows > 0 && (
	                <TableRow style={{ height: 48 * emptyRows }}>
	                  <TableCell colSpan={6} />
	                </TableRow>
	              )}
	            </TableBody>
	            <TableFooter>
	              <TableRow>
	                <TablePagination
	                  colSpan={7}
	                  count={data.length}
	                  rowsPerPage={rowsPerPage}
	                  page={page}
	                  onChangePage={(event, page) => onChangePage(page)}
	                  onChangeRowsPerPage={(event) => onChangeRowsPerPage(event.target.value)}
	                  Actions={TablePaginationActionsWrapped}
										rowsPerPageOptions={[5,10,15]}
	                />
	              </TableRow>
	            </TableFooter>
	          </Table>
	        </div>
	      </Paper>
		)
	}
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomPaginationActionsTable)
