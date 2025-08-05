import Footer from "../components/Footer";

const Contact = () => {
  return (
    <section className="w-full">
      <div className="w-full relative">
        <video
          playsInline
          autoPlay
          loop
          muted
          poster="/pagesGraphicData/contact-poster-mobile.webp"
          className="max-h-[500px] w-full object-cover"
        >
          <source src="/hero/hero-video-desktop.webm" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl lg:text-[41px] xl:text-7xl text-text-light uppercase font-bold">
            Contact
          </h2>
        </div>
      </div>
      <div className="w-full pt-7 pb-5">
        <div className="w-full px-4">
          <div className="p-4 flex flex-col justify-center items-center gap-y-4">
            <h2 className="uppercase tracking-wide font-bold text-lg w-full text-center">
              Get in touch with us
            </h2>
            <p className="text-center">
              Have questions or need assistance? Fill out the form below, and
              we’ll get back to you as soon as possible!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <form className="max-w-xl mx-auto pb-6 space-y-6">
          <div className="w-full flex flex-col justify-between items-center gap-4 lg:flex-row">
            <fieldset className="border border-gray-400 rounded px-4 flex-1 w-full">
              <legend className="text-sm px-2 text-gray-600">Full Name</legend>
              <input
                type="text"
                name="name"
                className="w-full border-none outline-none px-2 py-2 bg-transparent"
              />
            </fieldset>

            <fieldset className="border border-gray-400 rounded px-4 flex-1 w-full">
              <legend className="text-sm px-2 text-gray-600">
                Phone Number
              </legend>
              <input
                type="tel"
                name="phone"
                className="w-full border-none outline-none px-2 py-2 bg-transparent"
              />
            </fieldset>
          </div>

          <fieldset className="border border-gray-400 rounded px-4 ">
            <legend className="text-sm px-2 text-gray-600">Email</legend>
            <input
              type="email"
              name="email"
              className="w-full border-none outline-none px-2 py-2 bg-transparent"
            />
          </fieldset>

          <fieldset className="border border-gray-400 rounded px-4 ">
            <legend className="text-sm px-2 text-gray-600">Comment</legend>
            <textarea
              name="message"
              rows={4}
              className="w-full border-none outline-none px-2 py-1 bg-transparent resize-none"
            ></textarea>
          </fieldset>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg uppercase tracking-wider"
          >
            Send a form
          </button>
        </form>
      </div>
    </section>
  );
};
<div className="w-full">
  <Footer />;
</div>;
export default Contact;
