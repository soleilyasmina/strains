import React from 'react';

export default function Permissions(props) {
  return (
    <div className="Permissions">
      <div>
        <h1>Welcome to Lexicanna.</h1>
        <p>You are now entering <em>Lexicanna</em>,
        your guide to medical cannabis. You must be
        21 years old to enter.</p>
        <form>
          <input type="date" name="dateTime" value={props.birthday} onChange={props.setBirthday}/>
          <input type="button" value="submit" onClick={props.setPermissions}/>
        </form>
      </div>
    </div>
  )
}
