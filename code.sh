#!/bin/bash
## WRF installation with parallel process.
# Download and install required library and data files for WRF.
# License: LGPL
# Jamal Khan <jamal.khan@legos.obs-mip.fr>
# Tested in Ubuntu 18.04 LTS

# basic package managment
sudo apt update
sudo apt upgrade
sudo apt install gcc gfortran g++ libtool automake autoconf make m4 grads default-jre csh

## Directory Listing
export HOME=`cd;pwd`
mkdir $HOME/WRF
cd $HOME/WRF
mkdir Downloads
mkdir Library

## Downloading Libraries
cd Downloads
wget -c https://www.zlib.net/fossils/zlib-1.2.13.tar.gz
wget -c https://support.hdfgroup.org/ftp/HDF5/releases/hdf5-1.10/hdf5-1.10.5/src/hdf5-1.10.5.tar.gz
wget -c https://downloads.unidata.ucar.edu/netcdf-c/4.9.0/netcdf-c-4.9.0.tar.gz
wget -c https://downloads.unidata.ucar.edu/netcdf-fortran/4.6.0/netcdf-fortran-4.6.0.tar.gz
wget -c http://www.mpich.org/static/downloads/3.3.1/mpich-3.3.1.tar.gz
wget -c https://download.sourceforge.net/libpng/libpng-1.6.37.tar.gz
wget -c https://www.ece.uvic.ca/~frodo/jasper/software/jasper-1.900.1.zip

# Compilers
export DIR=$HOME/WRF/Library
export CC=gcc
export CXX=g++
export FC=gfortran
export F77=gfortran

# zlib
cd $HOME/WRF/Downloads
tar -xvzf zlib-1.2.13.tar.gz
cd zlib-1.2.13/
./configure --prefix=$DIR
make
make install

# hdf5 library for netcdf4 functionality
cd $HOME/WRF/Downloads
tar -xvzf hdf5-1.10.5.tar.gz
cd hdf5-1.10.5
./configure --prefix=$DIR --with-zlib=$DIR --enable-hl --enable-fortran
make check
make install

export HDF5=$DIR
export LD_LIBRARY_PATH=$DIR/lib:$LD_LIBRARY_PATH

## Install NETCDF C Library
cd $HOME/WRF/Downloads
tar -xvzf netcdf-c-4.9.0.tar.gz
cd netcdf-c-4.9.0/
export CPPFLAGS=-I$DIR/include 
export LDFLAGS=-L$DIR/lib
./configure --prefix=$DIR --disable-dap
make check
make install

export PATH=$DIR/bin:$PATH
export NETCDF=$DIR

## NetCDF fortran library
cd $HOME/WRF/Downloads
tar -xvzf netcdf-fortran-4.6.0.tar.gz
cd netcdf-fortran-4.6.0/
export LD_LIBRARY_PATH=$DIR/lib:$LD_LIBRARY_PATH
export CPPFLAGS=-I$DIR/include 
export LDFLAGS=-L$DIR/lib
export LIBS="-lnetcdf -lhdf5_hl -lhdf5 -lz" 
./configure --prefix=$DIR --disable-shared
make check
make install

## MPICH
cd $HOME/WRF/Downloads
tar -xvzf mpich-3.3.1.tar.gz
cd mpich-3.3.1/
./configure --prefix=$DIR
make
make install

export PATH=$DIR/bin:$PATH

# libpng
cd $HOME/WRF/Downloads
export LDFLAGS=-L$DIR/lib
export CPPFLAGS=-I$DIR/include
tar -xvzf libpng-1.6.37.tar.gz
cd libpng-1.6.37/
./configure --prefix=$DIR
make
make install

# JasPer
cd $HOME/WRF/Downloads
unzip jasper-1.900.1.zip
cd jasper-1.900.1/
autoreconf -i
./configure --prefix=$DIR
make
make install
export JASPERLIB=$DIR/lib
export JASPERINC=$DIR/include

############################ WRF 4.1.2 #################################
## WRF v4.1.2
## Downloaded from git tagged releases
########################################################################
cd $HOME/WRF/Downloads
wget -c https://github.com/wrf-model/WRF/archive/v4.1.2.tar.gz
tar -xvzf v4.1.2.tar.gz -C $HOME/WRF
cd $HOME/WRF/WRF-4.1.2
#./clean
./configure # 34, 1 for gfortran and distributed memory
./compile em_real

export WRF_DIR=$HOME/WRF/WRF-4.1.2

# ## WPSV4.1
# cd $HOME/WRF/Downloads
# wget -c https://github.com/wrf-model/WPS/archive/v4.1.tar.gz
# tar -xvzf v4.1.tar.gz -C $HOME/WRF
# cd $HOME/WRF/WPS-4.1
# ./configure #3
# ./compile

# ######################## Post-Processing Tools ####################
# ## ARWpost
# cd $HOME/WRF/Downloads
# wget -c http://www2.mmm.ucar.edu/wrf/src/ARWpost_V3.tar.gz
# tar -xvzf ARWpost_V3.tar.gz -C $HOME/WRF
# cd $HOME/WRF/ARWpost
# ./clean
# sed -i -e 's/-lnetcdf/-lnetcdff -lnetcdf/g' $HOME/WRF/ARWpost/src/Makefile
# ./configure #3
# sed -i -e 's/-C -P/-P/g' $HOME/WRF/ARWpost/configure.arwp
# ./compile

# ######################## Model Setup Tools ########################
# ## DomainWizard
# cd $HOME/WRF/Downloads
# wget -c http://esrl.noaa.gov/gsd/wrfportal/domainwizard/WRFDomainWizard.zip
# mkdir $HOME/WRF/WRFDomainWizard
# unzip WRFDomainWizard.zip -d $HOME/WRF/WRFDomainWizard
# chmod +x $HOME/WRF/WRFDomainWizard/run_DomainWizard

# ######################## Static Geography Data ####################
# # http://www2.mmm.ucar.edu/wrf/users/download/get_sources_wps_geog.html
# cd $HOME/WRF/Downloads
# wget -c https://www2.mmm.ucar.edu/wrf/src/wps_files/geog_high_res_mandatory.tar.gz
# tar -xvzf geog_high_res_mandatory.tar.gz -C $HOME/WRF


# ## export PATH and LD_LIBRARY_PATH
# echo "export PATH=$DIR/bin:$PATH" >> ~/.bashrc
# echo "export LD_LIBRARY_PATH=$DIR/lib:$LD_LIBRARY_PATH" >> ~/.bashrc