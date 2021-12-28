import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import firebase from 'firebase';

import SettingsList from './settings-list'
import YourCycle from './your-cycle';

import {
    fetchSettings
} from '../../actions/settingsActions';
class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            changed: false,
            settings: {}
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { settings } = this.props;
        this.setState({ settings });
        
        this.props.fetchSettings();
    }

    handleSave() {
        const db = firebase.database();
        const dbRef = db.ref('settings');
        const { settings } = this.state;

        dbRef.set(settings);
        dbRef.on('value', 
            data => { 
                const payload = data.val();
                if (payload) {
                    console.log('Settings saved', payload)
                }
            }, 
            err => console.error(err));

        this.setState({ redirect: '/' });
    }

    handleChange(action, config) {        
        const { max, min, step, pname } = config;
        const { changed } = this.state;
        const { settings } = changed ? this.state : this.props;
        
        !changed && this.setState({ changed: true });
        
        if (action === 'plus' && settings[pname] < max) {            
            settings[pname] = settings[pname] + step;
        }
        if (action === 'minus' && settings[pname] > min) {            
            settings[pname] = settings[pname] - step;
        }
        this.setState({ settings });
    }

    render() {
        const { 
            redirect,
            changed
        } = this.state;
        const { settings } = this.props;
        
        if (redirect) return <Redirect to={ redirect } />

        return (
            <main className="main">
              <div className="content">
                <h1 className="heading">Settings</h1>
                <h2 className="subheading">Pomodoros settings</h2>
                <SettingsList settings={ changed ? this.state.settings : settings } 
                              handleChange={ this.handleChange } />
                <YourCycle settings={ changed ? this.state.settings : settings } />
                <div className="buttons">
                  <Link to="/" className="buttons__btn buttons__btn--blue">Go to tasks</Link>
                  <a className="buttons__btn buttons__btn--green" onClick={ this.handleSave }>Save</a>
                </div>
              </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings.items
});

export default connect(mapStateToProps, { fetchSettings })(SettingsPage);
