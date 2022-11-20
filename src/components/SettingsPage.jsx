import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import firebase from "firebase";
import { getDatabase, ref, onValue, set} from "firebase/database";
import SettingsList from "./SettingsList";
import SettingsCycle from "./SettingsCycle";
import { fetchSettings, settingChange } from "../actions/settingsActions";
import Preloader from "./Preloader";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.db = getDatabase();
    this.dbRef = ref(this.db, 'settings');
  }

  componentDidMount() {
    const { settings } = this.props;
    this.setState({ settings });

    this.props.fetchSettings();
  }

  handleSave() {
    const { settings } = this.props;

    set(this.dbRef, settings);
    onValue(
      this.dbRef,
      (data) => {
        const payload = data.val();
        if (payload) {
          console.log("Settings saved", payload);
        }
      },
      (err) => {
        console.log("Error saving settings");
        console.error(err);
      }
    );

    this.setState({ redirect: "/" });
  }

  handleChange(action, config) {
    this.props.settingChange(action, config);
  }

  render() {
    const { redirect } = this.state;
    const { settings, isLoading } = this.props;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <main className="main">
        <div className="content">
          <h1 className="heading">Settings</h1>
          <h2 className="subheading">Pomodoros settings</h2>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <SettingsList settings={settings} handleChange={this.handleChange} />
              <SettingsCycle settings={settings} />
              <div className="buttons">
                <Link to="/" className="buttons__btn buttons__btn--blue">
                  Go to tasks
                </Link>
                <a className="buttons__btn buttons__btn--green" onClick={this.handleSave}>
                  Save
                </a>
              </div>
            </>
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings.items,
  isLoading: state.settings.isLoading,
});

export default connect(mapStateToProps, { fetchSettings, settingChange })(SettingsPage);
