export default function TabTwo() {

  return (
    <div>
      <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" name="department" required>
                  <option value="">-- Select Department --</option>
                  <option value="cs">Computer Science</option>
                  <option value="it">Information Technology</option>
                  <option value="se">Information Software</option>
                  <option value="ai">Multi media</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>


              <div className="form-group">
                <label form="complaintDescription">Description</label>
                <textarea id="complaintDescription" name="description" required 
                  placeholder="Please provide detailed information about your suggestion..."></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit
              </button>
              
  </div>
              






  );
}