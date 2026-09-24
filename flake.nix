{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        deps = with pkgs; [ nodejs_22 ];

        dev = pkgs.writeShellApplication {
          name = "dev";
          runtimeInputs = deps ++ [ pkgs.python3 ];
          text = ''
            npm install
            npm run bulid &
            trap 'kill $! 2>/dev/null || true' EXIT
            python3 -m http.server "''${PORT:-8080}" -d src
          '';
        };

        gh-pages = pkgs.writeShellApplication {
          name = "gh-pages";
          runtimeInputs = deps ++ [ pkgs.git ];
          text = ''
            npm install
            npx tailwindcss -i ./src/input.css -o ./src/output.css --minify
            npx gh-pages -d src
          '';
        };

        mkApp = drv: {
          type = "app";
          program = "${drv}/bin/${drv.name}";
        };
      in
      {
        devShells.default = pkgs.mkShell { packages = deps ++ [ dev gh-pages ]; };

        apps = {
          dev = mkApp dev;
          gh-pages = mkApp gh-pages;
        };
      });
}
