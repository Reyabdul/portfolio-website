export const Footer = () => {
  const date: Date = new Date();

  return (
    <div>
      <footer className="w-full text-normal p-4 md:p-10 fixed bottom-0" id="footer">
        <p className="copyright">&#169;Rey Abdul {date.getFullYear()}</p>
        {/* <button className="contact-button button" id="contact-button">
            <span><p className="contact">Contact</p></span>
        </button> */}
      </footer>
    </div>
  );
};
