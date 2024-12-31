import {
  Facebook,
  InstagramIcon,
  MapPin,
  Phone,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";
import i1 from "./../assets/img/1 (1).jpeg";
import i2 from "./../assets/img/1 (1).jpg";
import i3 from "./../assets/img/1 (1).webp";
import i4 from "./../assets/img/1 (2).jpg";
import i5 from "./../assets/img/1 (3).jpg";
import i6 from "./../assets/img/1 (4).jpg";
export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-20 px-12">
        <div className="container mx-auto px-6 mt-28">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Facebook />
                <TwitterIcon />
                <InstagramIcon />
                <YoutubeIcon />
              </div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Submit Article
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Freebies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  (888) 231 4522 258
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  3129 Doctors Drive, Los Angeles California, USA
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <h3 className="text-xl font-bold mb-4 ">Gallery Showcase</h3>
              <div className="grid grid-cols-3 gap-2">
                {[i1, i2, i3, i4, i5, i6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item}
                      alt={`Gallery image ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full h-16 bg-bg-primary"></div>
    </div>
  );
}
