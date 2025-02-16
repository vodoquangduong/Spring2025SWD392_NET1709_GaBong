const About = () => {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Info */}
        <div className="lg:col-span-8">
          <h1 className="text-4xl font-bold mb-6">Hello!</h1>
          <h2 className="text-2xl text-emerald-600 mb-8">
            I'm John Doe, Full Stack Developer
            <br />
            Based in San Francisco
          </h2>

          <div className="space-y-6 text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Name:</span>
                <p>John Doe</p>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <p>hello@johndoe.com</p>
              </div>
              <div>
                <span className="text-gray-400">Phone:</span>
                <p>+1 234 5678</p>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <p>San Francisco, CA</p>
              </div>
            </div>

            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Download Resume
            </button>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="lg:col-span-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="John Doe"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Industry Knowledge */}
          <div>
            <h3 className="text-emerald-600 font-medium mb-6">
              Industry Knowledge
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Brand Identity</span>
                  <span>85%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Product Design</span>
                  <span>95%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Interaction Design</span>
                  <span>80%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-emerald-600 font-medium mb-6">Tools</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Figma</span>
                  <span>70%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Sketch</span>
                  <span>90%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>After Effects</span>
                  <span>75%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-emerald-600 font-medium mb-6">Languages</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>English</span>
                  <span>95%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>French</span>
                  <span>45%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-emerald-600 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Let's work together on your next project
        </h2>
        <div className="flex justify-center gap-12 mt-8">
          <div className="text-center">
            <p className="text-emerald-600 mb-2">+1 234 5678</p>
            <p className="text-sm text-gray-500">Call Me</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-600 mb-2">San Francisco, CA</p>
            <p className="text-sm text-gray-500">Address</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-600 mb-2">hello@johndoe.com</p>
            <p className="text-sm text-gray-500">Email Me</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
